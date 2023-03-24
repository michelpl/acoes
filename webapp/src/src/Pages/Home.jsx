import Form from "../components/Form"
import UpdateStockData from "../components/UpdateStockData"
import React, {useState} from "react";
import {Button, Paper} from "@mui/material";
import List from "../components/StockList";

export default function Home() {
    const [todos, setTodos] = useState([]);

    const [count, setCount] = useState(0);

    const todoHandler = (todo) => {
        setTodos([...todos, todo])
    }

    const setResult = (result) => {
        setCount(result.length);
        setStocks(result);
    }

    const getJson = async () => {
        setCount("loading...");
        const result = fetch('http://localhost:8000/api/V1/stock-list')
        .then(response => response.json())
        .then(json => setResult(json))
    }

    const [stocks, setStocks] = useState(getJson);

    return (
        <div>
            <div className="">
                <Form
                    todoHandler={ todoHandler }
                />
            </div>
            <div>
                <h5>Results: {count}</h5>
            </div>
            <div>
                <Button fullWidth={true} variant="contained" onClick={ () => getJson() }>Refresh stock list</Button>
                <List rows={ stocks }/>
            </div>
            <div className="update">
                <Paper style={{ padding: 15, alignContent: "center", verticalAlign: "center" }}>
                    <h3>Update stock data</h3>
                    <UpdateStockData/>
                </Paper>
            </div>
        </div>
    );
}
