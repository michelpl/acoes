import * as React from 'react';
import Box from '@mui/material/Box';
import DataGrid from './DataGrid';
import {Link, TextField} from "@mui/material";
import {useState} from "react";
import reportWebVitals from "../reportWebVitals";

export default function DataGridDemo({ rows }) {

    const [filteredRows, setFilteredRows] = useState([]);

    const setFiltered = async (value) => {
        setFilteredRows(value)
    }

    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <Box sx={{ padding: 2 }} >
                <TextField
                    fullWidth={true}
                    style={{ marginBottom: 10}}
                    id="filterSlug"
                    label="Search for slug"
                    onChange={
                        (e) => { setFiltered(e.target.value); }
                    }
                >
                </TextField>
            </Box>
            <DataGrid rows={ rows }
            ></DataGrid>
        </Box>
    );
}