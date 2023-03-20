import {Button, outlinedInputClasses, Paper, TextField} from "@mui/material";
import React, {useState} from "react";

export default function Form({ todoHandler }) {
    const [text, setText] = useState(null);
    const [id, setId] = useState(0);

    const todoCreate = (text) => {
        let todoObj = {text: text, id: id};
        setId(id + 1);
        todoHandler(todoObj);
    }

    return (
        <Paper style={{ padding: 15, alignContent: "center", verticalAlign: "center" }}>
            <TextField
                fullWidth={true}
                style={{ marginBottom: 10}}
                id={outlinedInputClasses}
                label="Stock slug"
                onChange={
                    (e) => setText(e.target.value)
                }
            >
            </TextField>
            <Button
                fullWidth={true}
                variant="contained" onClick={ () => todoCreate(text) }>Add</Button>
        </Paper>
    );
}