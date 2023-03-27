import Form from "../components/Form"
import UpdateStockData from "../components/UpdateStockData"
import React, {useState} from "react";
import {Button, Paper} from "@mui/material";
import List from "../components/StockList";
import Box from "@mui/material/Box";

export default function Home() {
    const [todos, setTodos] = useState([]);

    const todoHandler = (todo) => {
        setTodos([...todos, todo])
    }

    const setResult = (result) => {
        setStocks(result);
    }

    const getJson = async () => {
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

            </div>
            <div>
                <Box sx={{ padding: 2 }} >
                    <h2>Lista de ações</h2>
                </Box>
                <List rows={ stocks }/>
                <Button fullWidth={true} variant="contained" onClick={ () => getJson() }>Atualizar lista de ações</Button>
            </div>
            <div className="update">
                <Paper style={{ padding: 15, alignContent: "center", verticalAlign: "center" }}>
                    <h3>Atualizar dados externos</h3>
                    <UpdateStockData/>
                </Paper>
            </div>
        </div>
    );
}
