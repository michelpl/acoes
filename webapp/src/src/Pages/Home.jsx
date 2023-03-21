import Card from "../components/Card";
import Form from "../components/Form"
import React, {useState} from "react";
import {Button} from "@mui/material";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [count, setCount] = useState(0);
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);

    const todoHandler = (todo) => {
        setTodos([...todos, todo])
    }

    const setResult = (result) => {
        setCount(result.length);
        setStocks(result);
    }

    const getJson = () => {
        const result = fetch('http://localhost:8000/api/V1/stock-list')
        .then(response => response.json())
        .then(json => setResult(json))
    }

    return (
        <div>
            <div className="">
                <Form
                    todoHandler={ todoHandler }
                />
            </div>
            <div className="update">
                <Button
                    fullWidth={true}
                    variant="contained" onClick={ () => getJson() }>Update</Button>
            </div>
            <div>
                <h5>Results: {count}</h5>
            </div>
            {
                stocks.map((stock) => (
                    <div className="cardbox"><Card data={stock} /></div>
                ))
            }

        </div>
    );
}
