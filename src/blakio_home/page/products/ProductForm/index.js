import React, { useState, useEffect } from "react";
import "./main.css"

import {
    Paper
} from "blakio_home/components";

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

    const shortMenu = true;

    const defaultInputValue = {
        name: "",
        cost: "",
    }

    const [formValues, setFormValues] = useState(defaultInputValue);

    useEffect(() => {
        setFormValues(defaultInputValue)
    }, [])

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
        const method = "addProduct";
        const title = "Add Product";
        const message = "Successfully added product";
        if(!formValues.name.length || !formValues.cost.length){
            return Util.showError("", "Must fill in both Name and Cost")
        }
        Axios[method]({
            ...formValues
        }).then(data => {
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
        Axios.deleteProduct().then(data => {
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
            title="Add Product"
            color="green"
        >
            <div className="employeeFormContainer">
                <p>Name</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter product name" type="name" onChange={handleChange} value={getValue("name")}/>
                <p>Cost per unit (ex: per item or per lb)</p>
                <div className="beforeInputContent">
                    <span>$</span>
                    <input pattern="[0-9]*" min="0.01" step="0.01" className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="0.00" type="cost" onChange={handleChange} value={getValue("cost")}/>
                </div>
                <button className="submitBtn" onClick={onSubmit}>Add</button>
                <button className="submitBtn" onClick={onCancel}>Cancel</button>
            </div>
        </Paper>
    </div>)
}

export default ProductForm;