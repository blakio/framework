import React from "react";
import "./main.css";

import {
    Paper
} from "../../components";

import {
    products,
    icons
} from "./icons"

import Button from "../../components/Button";

const ItemScreen = () => {
    return (<div>
        <Paper
            title="Items"
            color="blue"
        >
            {products.map(data => {
                if(data.active){
                    return (<Button
                        // icon={icons[data.category]}
                        text={data.name}
                        title={`$${data.price}/${data.unit}`}
                        width={"90%"}
                        backgroundIcon={true}
                    />)
                }
                return;
            })}
        </Paper>
    </div>)
}

export default ItemScreen;