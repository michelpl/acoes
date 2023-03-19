import {outlinedInputClasses, TextField} from "@mui/material";
import React from "react";

export default function Form() {
    return (
        <div>
            <TextField id={outlinedInputClasses} label="Stock slug" ></TextField>
        </div>
    );
}