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
    const [selected, setSelected] = useState();

    const th = ["Order ID", "Total", "Refund", "Status", "Card Holder", "Last 4"];
    const [ids, setIds] = useState([]);

    useEffect(() => {
        dispatch({
            type: Types.IS_LOADING,
            payload: true
        });

        Axios.listPayments().then(payment => {
            dispatch({
                type: Types.IS_LOADING,
                payload: false
            });

            const tData = [];
            const idArray = [];
            payment.data.forEach((data, i) => {
                idArray.push(data.order_id);
                tData.push([
                    data.order_id,
                    data.total,
                    data.refund,
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
        }).catch(err => {

            dispatch({
                type: Types.IS_LOADING,
                payload: false
            });

            console.log(err)
        });
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

    const isSelected = id => {
        return id === selected;
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
                    if(selected === orderId) {
                        dispatch({
                            type: Types.SET_ITEMS_PURCHASED,
                            payload: []
                        })
                        return setSelected(null)
                    };
                    setSelected(orderId)

                    const item = state.payments.list.filter(data => data.includes(orderId));
                    const [
                        order_id
                    ] = item[0];

                    dispatch({
                        type: Types.IS_LOADING,
                        payload: true
                    });

                    Axios.getItemsPurchased(order_id).then(payment => {

                        dispatch({
                            type: Types.IS_LOADING,
                            payload: false
                        });

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
                            dispatch({
                                type: Types.SET_PAYMENT_ID,
                                payload: data[0].paymentId
                            })
                        }
                    }).catch(err => {

                        dispatch({
                            type: Types.IS_LOADING,
                            payload: false
                        });

                        console.log(err)
                    });
                }}
                ids={ids}
                isSelected={isSelected}
            />
        </Paper>
    </div>)
}

export default TransactionTable;