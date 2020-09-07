import React, { useState, useEffect } from "react";
import {
    Paper,
    Table
} from "blakio_home/page/components";

const TransactionTable = () => {

    const defaultTh = ["ID", "Total", "Refund", "Status", "Cardholder"];
    const [th, setTh] = useState(defaultTh);
    const [td, setTd] = useState([]);

    useEffect(() => {
        const apiData = [{
            "id": "V4RrVpvdqOqY3h79Y5Be1U63uaB",
            "refund": 200,
            "total": 200,
            "status": "COMPLETED",
            "cardHolder": "LLC/BLAKIO"
        }];
        const tData = [];
        apiData.forEach(data => {
            tData.push([
                data.id,
                data.refund,
                data.total,
                data.status,
                data.cardHolder
            ])
        });
        setTd(tData);
    }, []);

    const getHeadData = data => data;
    const getData = data => {
        const num = parseFloat(data);
        if(isNaN(num)) return data;
        return `$${data/100}`;
    };

    return (<div>
        <Paper
            title="Transactions"
            color="blue"
        >
            <Table
                th={th}
                td={td}
                getHeadData={getHeadData}
                getData={getData}
            />
        </Paper>
    </div>)
}

export default TransactionTable;