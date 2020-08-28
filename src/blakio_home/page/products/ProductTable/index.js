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

const ProductTable = () => {
    const [state, dispatch] = StateContext();

    useEffect(() => { Util.getProducts(dispatch) }, []);

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
        if(isNaN(data)){
            return data
        }
        return `$${data.toFixed(2)}`
    };

    const isSelected = id => {
        return id === state.products.updateId;
    }

    return (<div className="timeSummary">
        <Paper
            title="Product Directory"
            color="blue"
        >
            <Table
                th={getTh()}
                td={getTd()}
                getHeadData={getHeadData}
                getData={getData}
                isSelected={isSelected}
                fields={fields}
                ids={ids}
                onClick={id => dispatch({
                    type: Types.UPDATE_PRODUCT,
                    payload: id !== state.products.updateId ? id : null
                })}
            />
        </Paper>
    </div>);
}

export default ProductTable;