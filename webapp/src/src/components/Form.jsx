import {Alert, Paper, TextField} from "@mui/material";
import React, {useState} from "react";

export default function Form({ todoHandler }) {
    const [current, setCurrent] = useState(0);
    const [dividend, setDividend] = useState(0);
    const [monthly, setMonthly] = useState("0%");
    const [yearly, setYearly] = useState("0%");

    const calculatePercentage = (current, dividend) => {
        let monthly = (dividend * 100 / current).toFixed(2);
        let yearly = ((((1 + monthly /100) **12) -1) * 100).toFixed(2);

        setMonthly(monthly + "%");
        setYearly(yearly + "%");
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
                    label="Current value"
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
                    label="Dividend"
                    onChange={
                        (e) => { setDividend(e.target.value);  calculatePercentage(current, e.target.value);}
                    }
                >
                </TextField>
            </div>
            <div>
                <Alert severity="success">{ "Monthly rentability: " + monthly } | { "Yearly rentability: " + yearly } </Alert>
            </div>
        </Paper>
    );
}