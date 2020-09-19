import React, { useState, useEffect } from "react";
import {
    Paper,
    Table
} from "blakio_home/page/components";
import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types"

import Axios from "blakio_axios";
import Util from "blakio_util";

const TransactionTable = () => {
    const [state, dispatch] = StateContext();
    const [selected, setSelected] = useState();
    const [filter, setFilter] = useState();

    const th = ["Payment ID", "Total", "Refund", "Status", "Card Holder"];
    const [ids, setIds] = useState([]);

    const getTransactions = (last_4) => {
        dispatch({
            type: Types.IS_LOADING,
            payload: true
        });

        Axios.listPayments({
            last_4
        }).then(payment => {

            dispatch({
                type: Types.IS_LOADING,
                payload: false
            });

            if(payment.data.error) {
                dispatch({
                    type: Types.SET_PAYMENT_LIST,
                    payload: []
                })
                return Util.showError("Not found", "No card found under that number")
            }

            const tData = [];
            const idArray = [];
            payment.data.forEach((data, i) => {
                idArray.push(data.payment_id);
                tData.push([
                    data.payment_id,
                    data.total,
                    data.refund,
                    data.status,
                    data.cardHolder
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
    }

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

    const inputfilters = [
        {
            placeholder: "Enter last 4 digits on card",
            type: "number",
            maxlength: null,
            headerText: "Last 4",
            value: filter,
            onChange: e => {
                const {
                    value
                } = e.target;
                if(value.length <= 4){
                    setFilter(e.target.value)
                }
            },
            onSubmit: () => {
                if(filter.length === 4) getTransactions(filter);
            }
        }
    ];

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
                inputfilters={inputfilters}
                onClick={clickedId => {
                    if(selected === clickedId) {
                        dispatch({
                            type: Types.SET_ITEMS_PURCHASED,
                            payload: []
                        })
                        return setSelected(null)
                    };
                    setSelected(clickedId);

                    const {
                        paymentId
                    } = state.payments;
                    console.log(paymentId)

                    const item = state.payments.list.filter(data => data.includes(clickedId));
                    const [
                        payment_id
                    ] = item[0];

                    dispatch({
                        type: Types.IS_LOADING,
                        payload: true
                    });

                    Axios.getItemsPurchased(payment_id).then(payment => {

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