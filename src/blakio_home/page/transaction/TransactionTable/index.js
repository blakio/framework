import React, { useState, useEffect } from "react";
import {
    Paper,
    Table
} from "blakio_home/page/components";
import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types"

import Axios from "blakio_axios";

const TransactionTable = () => {
    const [state, dispatch] = StateContext();

    const th = ["Order ID", "Total", "Refund", "Status", "Cardholder", "Last 4"];
    const [ids, setIds] = useState([]);

    useEffect(() => {
        Axios.listPayments().then(payment => {
            const tData = [];
            const idArray = [];
            payment.data.forEach((data, i) => {
                idArray.push(data.order_id);
                tData.push([
                    data.order_id,
                    data.refund,
                    data.total,
                    data.status,
                    data.cardHolder,
                    data.last_4
                ])
            });
            dispatch({
                type: Types.SET_PAYMENT_LIST,
                payload: tData
            })
            setIds(idArray);
        }).catch(err => console.log(err));
    }, []);

    const getHeadData = data => data;
    const getData = data => {
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
            title="Payments"
            color="blue"
        >
            <Table
                th={th}
                td={state.payments.list}
                getHeadData={getHeadData}
                getHeadStyle={getHeadStyle}
                getData={getData}
                getStyle={getStyle}
                onClick={orderId => {
                    const item = state.payments.list.filter(data => data.includes(orderId));
                    const [
                        order_id
                    ] = item[0];
                    Axios.getItemsPurchased(order_id).then(payment => {
                        const {
                            data
                        } = payment;
                        if(!data.length){
                            dispatch({
                                type: Types.SET_ITEMS_PURCHASED,
                                payload: [["no items recorded"]]
                            })
                        } else {
                            const payments = [];
                            data[0].items.map(data => payments.push([
                                data._id,
                                data.name,
                                data.cost,
                                data.hasRefunded,
                            ]))
                            dispatch({
                                type: Types.SET_ITEMS_PURCHASED,
                                payload: payments
                            })
                        }
                    }).catch(err => console.log(err));
                }}
                ids={ids}
            />
        </Paper>
    </div>)
}

export default TransactionTable;