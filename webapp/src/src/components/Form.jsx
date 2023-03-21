import {Alert, Button, outlinedInputClasses, Paper, TextField} from "@mui/material";
import React, {useState} from "react";

export default function Form({ todoHandler }) {
    const [current, setCurrent] = useState(0);
    const [dividend, setDividend] = useState(0);
    const [percent, setPercent] = useState("");

    const calculatePercentage = (current, dividend) => {
        setPercent((dividend * 100 / current).toFixed(2) + "%");

    }

    return (
        <Paper style={{ padding: 15, alignContent: "center", verticalAlign: "center" }}>
            <h3>Check dividend rentability</h3>
            <div>
                <TextField
                    fullWidth={true}
                    type="number"
                    style={{ marginBottom: 10}}
                    id="current"
                    label="Cotação atual"
                    onChange={
                        (e) => { setCurrent(e.target.value); calculatePercentage(e.target.value, dividend)}
                    }
                >
                </TextField>
            </div>
            <div>
                <TextField
                    fullWidth={true}
                    style={{ marginBottom: 10}}
                    id="dividend"
                    type="number"
                    min="0"
                    label="Rendimento"
                    onChange={
                        (e) => { setDividend(e.target.value);  calculatePercentage(current, e.target.value);}
                    }
                >
                </TextField>
            </div>
            <div>
                <Alert severity="success">{ percent }</Alert>
            </div>
            <Button
                fullWidth={true}
                variant="contained" onEnter onClick={ () => calculatePercentage(current, dividend) }>Check</Button>
        </Paper>
    );
}