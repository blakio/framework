import React, { useState, useEffect } from "react";
import "./main.css";

import Collapsible from 'react-collapsible';

import {
    Paper,
    Table
} from "../../components";

import {
    StateContext
} from "blakio_context/State";
import Types from 'blakio_context/Types';

import {
    printResponse,
    openURLAndroid,
    openURLiOS
} from "./pos.js";

import Util from "blakio_util";

import Axios from "blakio_axios";

const getAccordian = (data, removeItem, id, onQuantityChange, quantity) => {
    return (<Collapsible trigger={data}>
        <div className="collapsibleChoices">
            <button className="submitBtn red" onClick={() => removeItem(id)}>Remove</button>
            <p>Quantity</p>
            <input value={quantity} pattern="[0-9]*" className="posNumberField" type="number" onChange={e => onQuantityChange(e.target.value, id)} />
        </div>
    </Collapsible>)
}

const ItemScreen = () => {
    const [state, dispatch] = StateContext();

    useEffect(() => {
        if (window.location.href.includes("/purchase")) {
            printResponse(Util.showSuccess, Util.showError);
        }
    }, [])

    const tableHead = ["Summary"];

    const {
        cart
    } = state.pointOfSale;

    const {
        list
    } = state.products;

    const getProductData = () => {
        Util.getProducts(dispatch);
    }

    useEffect(() => {
        getProductData();
    }, []);

    const getHeadData = data => data;

    const getIds = () => list.map(data => data._id);

    const removeItem = id => {
        dispatch({
            type: Types.REMOVE_FROM_CART,
            payload: id
        })
    }

    const onQuantityChange = (value, id) => {
        if (value === "0") {
            return removeItem(id)
        } else {
            dispatch({
                type: Types.ADJUST_ITEM_QUANTITY,
                payload: {
                    id,
                    quantity: value
                }
            })
        }
    }

    const getData = (data) => {
        if(data.includes("Grand Total")){
            return data;
        }
        const [
            text,
            id,
            quantity
        ] = data.split(" && ");
        return getAccordian(text, removeItem, id, onQuantityChange, quantity);
    }

    const getTableData = () => {
        const tableData = [];
        cart.forEach(data => {
            let total;
            const name = data.name.length > 20 ? data.name.substring(0, 20) + "..." : data.name;
            total = `$${(data.cost * parseFloat(data.quantity || 1)).toFixed(2)}`;
            tableData.push([`${name} x [ ${data.quantity || 1} ] x [ $${data.cost.toFixed(2)} ] = ${total} && ${data._id} && ${data.quantity}`])
        });
        if (cart.length) {
            const grandTotal = cart.reduce((accumulator, currentValue) => {
                const cost = parseFloat(currentValue.cost.toFixed(2) * (currentValue.quantity || 1));
                return accumulator + cost;
            }, 0);
            tableData.push([`Grand Total: $${grandTotal.toFixed(2)}`]);
        }
        return tableData;
    }

    const clearCart = () => {
        dispatch({
            type: Types.CLEAR_CART
        })
    }

    const getCharge = () => {
        let notes = "Transaction Summary:";
        let total = 0;
        const notesArray = [];
        cart.forEach(data => {
            if (data.quantity && data.quantity.length) {
                const subTotal = (parseFloat(data.quantity) * data.cost).toFixed(2)
                total += parseFloat(subTotal);
                notes += ` | ${data.name} => ${parseFloat(data.quantity)} x $${data.cost.toFixed(2)} = $${(parseFloat(data.quantity) * data.cost).toFixed(2)}`;

                for(let i = 0; i < data.quantity; i++){
                    notesArray.push({
                        name: data.name,
                        cost: data.cost,
                        hasRefunded: Boolean(data.refunded_money),
                    });
                }
            }
        });
        Axios.recordPurchase(notesArray)
            .then(data => console.log(data))
            .catch(err => console.log(err))
        return {
            notes,
            total: total * 100
        };
    }

    const buy = () => {
        const {
            notes,
            total
        } = getCharge();
        Util.getDeviceType() === "iOS" ? openURLiOS(notes, total) : openURLAndroid(notes, total);
    }

    return (<div id="pointOfSale">
        <Paper
            title="Cart"
            color="orange"
        >
            <Table
                getHeadData={getHeadData}
                getData={getData}
                th={tableHead}
                td={getTableData()}
                ids={getIds()}
                onClick={() => { }}
            />
            <div>
                {cart.length ? <button className="submitBtn" onClick={clearCart}>Clear Cart</button> : <div></div>}
                {cart.length ? <button className="submitBtn" onClick={buy}>Buy</button> : <div></div>}
            </div>
        </Paper>
    </div>)
}

export default ItemScreen;