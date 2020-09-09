import React, { useState, useEffect } from "react";
import "./main.css";

import {
    Paper,
    Table
} from "../../components";

import {
    StateContext
} from "blakio_context/State";
import Types from 'blakio_context/Types';

import Combobox from 'react-widgets/lib/Combobox'

import {
    printResponse,
    openURLAndroid,
    openURLiOS
} from "./pos.js";

import Util from "blakio_util";

import Axios from "blakio_axios";

const ItemScreen = () => {
    const [state, dispatch] = StateContext();

    useEffect(() => {
        if (window.location.href.includes("/purchase")) {
            printResponse(Util.showSuccess, Util.showError);
        }
    }, [])

    const [searchValue, setSearchValue] = useState("");

    const [open, setOpen] = useState(false);

    const [tableHead, setTableHead] = useState([
        "Remove",
        "Product",
        "Cost",
        "Quantity",
        "Total"
    ]);

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

    const onQuantityChange = (value, item) => {
        if (value === "0") {
            return removeItem(item._id)
        } else {
            dispatch({
                type: Types.ADJUST_ITEM_QUANTITY,
                payload: {
                    id: item._id,
                    quantity: value
                }
            })
        }
    }

    const getData = (data) => {
        if (data.includes("_removeButton")) {
            const [
                text,
                id
            ] = data.split("&");
            return <button className="submitBtn red" onClick={() => removeItem(id)}>Remove</button>
        } else if (data.includes("_inputField")) {
            const [
                text,
                item
            ] = data.split("&");
            const itemData = JSON.parse(item);
            return <input pattern="[0-9]*" className="posNumberField" type="number" onChange={e => onQuantityChange(e.target.value, itemData)} />;
        } else if (data.includes("_totalCost")) {
            return "";
        }
        return data
    }

    const getGrandTotal = tableData => {
        let total = 0;
        const totalIndex = 4;
        tableData.map(data => {
            const num = parseFloat(data[totalIndex].replace("$", ""))
            if (!isNaN(num)) {
                total += num;
            }
        });
        return total;
    }

    const getTableData = () => {
        const tableData = [];
        cart.forEach(data => {
            let total;
            if (data.quantity && data.quantity.length) {
                total = `$${(data.cost * parseFloat(data.quantity)).toFixed(2)}`;
            } else {
                total = `_totalCost&${data._id}`;
            }
            tableData.push([`_removeButton&${data._id}`, data.name, `$${data.cost.toFixed(2)}`, `_inputField&${JSON.stringify(data)}`, total])
        });
        const grandTotal = getGrandTotal(tableData);
        if (cart.length) {
            tableData.push(["", "", "", "Grand Total", `$${grandTotal.toFixed(2)}`]);
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
        state.deviceType === "iOS" ? openURLiOS(notes, total) : openURLAndroid(notes, total);
    }

    const toggle = () => setOpen(!open);

    return (<div id="pointOfSale">
        <Paper
            title="Cart"
            color="green"
        >
            <p className="title">Directions for payment</p>
            <ol>
                <li>Select an item with the input below</li>
                <li>Fill in the quantity</li>
                <li>Press the buy button when finished</li>
                <li>You will be redirected to the Square POS app for payment</li>
            </ol>
            <Table
                getHeadData={getHeadData}
                getData={getData}
                th={tableHead}
                td={getTableData()}
                ids={getIds()}
                onClick={() => { }}
            />
            <div className="posInput">
                <Combobox
                    data={list}
                    onChange={data => {
                        if (typeof data === "object") {
                            dispatch({
                                type: Types.ADD_TO_CART,
                                payload: data
                            });
                            setSearchValue("")
                            setOpen(false);
                        } else {
                            setSearchValue(data)
                            setOpen(true);
                        }
                    }}
                    filter='contains'
                    textField='name'
                    value={searchValue}
                    dropUp
                    placeholder="Select items here"
                    open={open}
                />
                <button onClick={toggle} tabindex="-1" title="open combobox" type="button" aria-disabled="false" aria-label="open combobox" className="rw-btn rw-btn-select comboboxInput">
                    <span aria-hidden="true" className="rw-i rw-i-caret-down"></span>
                </button>
            </div>
            <div>
                {cart.length ? <button className="submitBtn" onClick={clearCart}>Clear Cart</button> : <div></div>}
                {cart.length ? <button className="submitBtn" onClick={buy}>Buy</button> : <div></div>}
            </div>
        </Paper>
    </div>)
}

export default ItemScreen;