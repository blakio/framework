import React, { useState, useEffect } from "react";
import {
    Paper,
    Table
} from "blakio_home/page/components";
import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types"

import Axios from "blakio_axios";

const ItemsPurchasedTable = () => {
    const [state, dispatch] = StateContext();

    const th = ["ID", "Item", "Total", "Refunded"];
    const ids = state.payments.itemsPurchased.map(data => data[0]);

    const getHeadData = data => data;
    const getData = data => {
        if(data === true) return "Yes";
        if(data === false) return "No";
        const isNum = /^[0-9]+$/.test(data);
        if(isNum) return `$${data/100}`;
        return data;
    };

    const getHeadStyle = index => {
        if(index === 0){
            return {
                display: "none"
            }
        }
    }

    const getStyle = index => {
        if(index === 0){
            return {
                display: "none"
            }
        }
    }

    return (<div>
        <Paper
            title="Items Purchased"
            color="blue"
        >
            <Table
                getHeadStyle={getHeadStyle}
                getStyle={getStyle}
                th={th}
                td={state.payments.itemsPurchased}
                getHeadData={getHeadData}
                getData={getData}
                onClick={itemId => {
                    console.log("show refund", itemId)
                }}
                ids={ids}
            />
        </Paper>
    </div>)
}

export default ItemsPurchasedTable;