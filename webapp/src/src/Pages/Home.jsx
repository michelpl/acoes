import Card from "../components/Card";
import Form from "../components/Form"
import React, {useState} from "react";
import {Button} from "@mui/material";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [data, setData] = useState({});

    const todoHandler = (todo) => {
        setTodos([...todos, todo])
    }

    const setResult = (result) => {

            /*result.map((res) => {
                //console.log(res.id, res.title);
                const stock = {id: res.id, title: res.title};
                console.log(stock);


            });*/
            setTodos(result);
            console.log(stocks);
            //console.log(stocks);
        //setStocks([...stocks, stock]);
        //setTodos([...todos, stock])



    }

    const getJson = () => {
        const result = fetch('http://localhost:8000/api/V1/stock-list')
        .then(response => response.json())
        .then(json => setStocks(json))
    }

    return (
        <div>

            <div className="wrapper">
                <Form
                    todoHandler={ todoHandler }
                />
            </div>
            <div className="wrapper">
                <Button
                    fullWidth={true}
                    variant="contained" onClick={ () => getJson() }>Update</Button>
            </div>
            <ul>
                {
                    stocks.map((stock) => (
                        <li>{ stock.slug }</li>
                    ))
                }
            </ul>
            <div className="wrapper">

            </div>
            <div className="wrapper">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div className="wrapper">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    );
}
