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

const ItemScreen = () => {
    const [state, dispatch] = StateContext();

    useEffect(() => {
        if(window.location.href.includes("/purchase")){
            printResponse(Util.showSuccess, Util.showError);
        }
    }, [])

    const [searchValue, setSearchValue] = useState("")

    const [tableHead, setTableHead] = useState([
        "Remove",
        "Product",
        "Cost",
        "Quantity",
        "Total"
    ]);

    const {
        cart,
        items
    } = state.pointOfSale;

    const getProductData = () => {
        const products = [
            { _id: "1", name: "apple", price: 1.10 },
            { _id: "2", name: "orange", price: 0.89 },
            { _id: "3", name: "banana", price: 0.2 },
            { _id: "4", name: "peach", price: 0.5 }
        ];
        dispatch({
            type: Types.SET_CART_ITEMS,
            payload: products
        })
    }

    useEffect(() => {
        getProductData();
    }, []);

    const getHeadData = data => data;

    const getIds = () => items.map(data => data.id);

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
            return <input type="number" onChange={e => onQuantityChange(e.target.value, itemData)} />;
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
            if(!isNaN(num)){
                total += num;
            }
        });
        return total;
    }

    const getTableData = () => {
        const tableData = [];
        cart.forEach(data => {
            let total;
            if(data.quantity && data.quantity.length){
                total = `$${(data.price * parseFloat(data.quantity)).toFixed(2)}`;
            } else {
                total = `_totalCost&${data._id}`;
            }
            tableData.push([`_removeButton&${data._id}`, data.name, `$${data.price.toFixed(2)}`, `_inputField&${JSON.stringify(data)}`, total])
        });
        const grandTotal = getGrandTotal(tableData);
        if(cart.length){
            tableData.push(["", "", "", "Grand Total", `$${grandTotal.toFixed(2)}`]);
        }
        return tableData;
    }

    const clearCart = () => {
        dispatch({
            type: Types.CLEAR_CART
        })
    }

    const buy = () => {
        state.deviceType === "iOS" ? openURLiOS() : openURLAndroid();
    }

    return (<div>
        <Paper
            title="Cart"
            color="green"
        >
            <Table
                getHeadData={getHeadData}
                getData={getData}
                th={tableHead}
                td={getTableData()}
                ids={getIds()}
                onClick={() => {}}
            />
            <Combobox
                data={items}
                onChange={data => {
                    if (typeof data === "object") {
                        dispatch({
                            type: Types.ADD_TO_CART,
                            payload: data
                        });
                        setSearchValue("")
                    } else {
                        setSearchValue(data)
                    }
                }}
                filter='contains'
                textField='name'
                value={searchValue}
                dropUp
                placeholder="Select items here"
            />
            <div>
                {cart.length ? <button className="submitBtn" onClick={clearCart}>Clear Cart</button> : <div></div>}
                {cart.length ? <button className="submitBtn" onClick={buy}>Buy</button> : <div></div>}
            </div>
        </Paper>
    </div>)
}

export default ItemScreen;