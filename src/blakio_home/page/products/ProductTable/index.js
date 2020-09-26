import React, { useEffect } from "react";
import "./main.css";

import {
    StateContext
} from "blakio_context/State";

import {
    Paper,
    Table
} from "../../components";

import Types from "blakio_context/Types";
import Util from "blakio_util";

import {
    SnackBar
} from "blakio_home/page/components";

const ProductTable = props => {
    const [state, dispatch] = StateContext();

    useEffect(() => {
        dispatch({
            type: Types.IS_LOADING,
            payload: true
        });
        Util.getProducts(dispatch)
    }, []);

    const getTh = () => ([
        "Name",
        "Cost",
    ]);

    const ids = state.products.list.map(data => data._id);

    const getTd = () => {
        const td = [];
        state.products.list.forEach(data => td.push([
            data.name,
            data.cost,
        ]));
        return td;
    }

    const fields = [
        "Name",
        "Cost",
    ];

    const getHeadData = value => value;

    const getData = data => {
        if (isNaN(data)) {
            return data
        }
        return `$${data.toFixed(2)}`
    };

    const isSelected = id => {
        return id === state.products.updateId;
    }

    return (<div id="productsTable" className="timeSummary">
        <Paper
            title={props.page === "pos" ? "Click To Add To Cart" : "Product Directory"}
            color="green"
        >
            <div className="halfViewPortHeight">
                <SnackBar
                    text={props.page !== "pos" ? "Select product from table to edit" : "Select product from table to add to cart"}
                    type="warning"
                    isNote
                />
                <Table
                    th={getTh()}
                    td={getTd()}
                    getHeadData={getHeadData}
                    getData={getData}
                    isSelected={isSelected}
                    fields={fields}
                    ids={ids}
                    onClick={id => {
                        if(props.page === "pos"){
                            const index = ids.indexOf(id);
                            const data = getTd();
                            const [
                                name,
                                cost
                            ] = data[index];
                            return dispatch({
                                type: Types.ADD_TO_CART,
                                payload: {
                                    cost,
                                    name,
                                    _id: id,
                                    quantity: "1"
                                }
                            })
                        } else {
                            return dispatch({
                                type: Types.UPDATE_PRODUCT,
                                payload: id !== state.products.updateId ? id : null
                            })
                        }
                    }}
                />
            </div>
        </Paper>
    </div>);
}

export default ProductTable;