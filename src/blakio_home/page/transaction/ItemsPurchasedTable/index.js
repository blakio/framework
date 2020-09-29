import React, { useState } from "react";
import {
    Paper,
    Table,
    SnackBar
} from "blakio_home/components";
import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types"

import Axios from "blakio_axios";
import Util from "blakio_util";

const ItemsPurchasedTable = () => {
    const [state, dispatch] = StateContext();
    const [selected, setSelected] = useState();
    const {
        showError,
        showSuccess
    } = Util;

    const th = ["ID", "Item", "Total", "Refunded"];
    const ids = state.payments.itemsPurchased.map(data => data[0]);

    const getHeadData = data => data;
    const getData = data => {
        if (data === true) return "Yes";
        if (data === false) return "No";
        const isNum = /^[0-9]+$/.test(data);
        if (isNum) return `$${data}`;
        return data;
    };

    const getHeadStyle = index => {
        if (index === 0) {
            return {
                display: "none"
            }
        }
    }

    const getStyle = index => {
        if (index === 0) {
            return {
                display: "none"
            }
        }
    }

    const isSelected = id => {
        return id === selected;
    }

    const onRefund = () => {
        Axios.refundPayment({
            payment_id: state.payments.paymentId
        }).then(data => {
            Axios.updateRefundStatus(selected, state.payments.paymentId).then(data => {
                showSuccess("", "Successfully Refunded");
            }).catch(err => {
                showError("", "Error Saving");
            });
            setSelected(null);
            dispatch({
                type: Types.SET_ITEMS_PURCHASED,
                payload: []
            })
        }).catch(err => console.log(err))
    }

    const isRefundable = () => {
        const selectedItem = state.payments.itemsPurchased.filter(data => data[0] === selected);
        return selectedItem[0] && selectedItem[0][3] === false;
    }

    const onCancel = () => {
        dispatch({
            type: Types.SET_PAYMENT_ID,
            payload: null
        })
        dispatch({
            type: Types.SET_ITEMS_PURCHASED,
            payload: []
        })
    }

    return (<div>
        <Paper
            title="Previous Payment Status"
            color="blue"
        >
            <SnackBar
                text="Select a purchase from the table to issue refund."
                type="warning"
                isTip
            />
            <Table
                getHeadStyle={getHeadStyle}
                getStyle={getStyle}
                th={th}
                td={state.payments.itemsPurchased}
                getHeadData={getHeadData}
                getData={getData}
                onClick={itemId => {
                    if (selected === itemId) return setSelected(null);
                    setSelected(itemId);

                    console.log("show refund", itemId)
                }}
                ids={ids}
                isSelected={isSelected}
            />
            {selected && isRefundable(selected) && <button className="submitBtn red" onClick={onRefund}>Refund</button>}
            <button className="submitBtn" onClick={onCancel}>Cancel</button>
        </Paper>
    </div>)
}

export default ItemsPurchasedTable;