import React, { useState, useEffect } from "react";
import "./main.css"

import {
    Paper
} from "../../components";

import Axios from "blakio_axios";

import Types from "blakio_context/Types";
import {
    StateContext
} from "blakio_context/State";

import Util from "blakio_util";
const {
    showError,
    showSuccess
} = Util;

const ProductForm = () => {

    const [state, dispatch] = StateContext();
    const {
        updateId,
        list
    } = state.products;

    const shortMenu = true;

    const defaultInputValue = {
        name: "",
        cost: "",
    }

    const [formValues, setFormValues] = useState(defaultInputValue);

    useEffect(() => {
        const products = list.filter(data => data._id === updateId)[0];
        if(products){
            setFormValues({
                name: products.name,
                cost: products.cost,
            })
        } else {
            setFormValues(defaultInputValue)
        }
    }, [updateId])

    const handleChange = e => {
        let {
            value
        } = e.target;

        const type = e.target.getAttribute("type");

        if(type === "cost"){
            if(isNaN(value)) {
                return;
            }
        }

        setFormValues({
            ...formValues,
            [type]: value
        })
    }

    const onSubmit = () => {
        const method = updateId ? "updateProduct" : "addProduct";
        const title = updateId ? "Update Product" : "Add Product";
        const message = updateId ? "Successfully updated product" : "Successfully added product";
        if(!formValues.name.length || !formValues.cost.length){
            return Util.showError("", "Must fill in both Name and Cost")
        }
        Axios[method]({
            ...formValues
        }, updateId).then(data => {
            dispatch({
                type: Types.GET_PRODUCTS,
                payload: {
                  fn: (prod) => {
                    dispatch({
                      type: Types.SET_PRODUCTS,
                      payload: prod
                    })
                  }
                }
            });
            onCancel();
            showSuccess(title, message)
        }).catch(err => {
            console.log(err);
            showError("Error", "Please try again later");
        });
    }

    const onCancel = () => {
        setFormValues(defaultInputValue);
        dispatch({
            type: Types.UPDATE_PRODUCT,
            payload: null
        })
    }

    const onDelete = () => {
        Axios.deleteProduct(updateId).then(data => {
            dispatch({
                type: Types.GET_PRODUCTS,
                payload: {
                  fn: (prod) => {
                    dispatch({
                      type: Types.SET_PRODUCTS,
                      payload: prod
                    })
                  }
                }
            });
            onCancel();
            showSuccess("Delete Product", "Successfully deleted product")
        }).catch(err => {
            console.log(err);
            showError("Error", "Please try again later");
        });
    }

    const getValue = (key) => {
        return formValues[key];
    }

    return (<div className="employeeForm">
        <Paper
            title={updateId ? "Edit Product" : "Add Product"}
            color={updateId ? "orange" : "green"}
        >
            <div className="employeeFormContainer">
                <p>Name</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter product name" type="name" onChange={handleChange} value={getValue("name")}/>
                <p>Cost per unit (ex: per item or per lb)</p>
                <div className="beforeInputContent">
                    <span>$</span>
                    <input pattern="[0-9]*" min="0.01" step="0.01" className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="0.00" type="cost" onChange={handleChange} value={getValue("cost")}/>
                </div>
                <button className="submitBtn" onClick={onSubmit}>{updateId ? "Update" : "Add"}</button>
                <button className="submitBtn" onClick={onCancel}>Cancel</button>
                {updateId && <button className="submitBtn red" onClick={onDelete}>Delete</button>}
            </div>
        </Paper>
    </div>)
}

export default ProductForm;