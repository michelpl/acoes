import * as React from 'react';
import Box from '@mui/material/Box';
import DataGrid from './DataGrid';
import {useState} from "react";

export default function DataGridDemo({ rows }) {

    const [filteredRows, setFilteredRows] = useState([]);

    const setFiltered = async (value) => {
        setFilteredRows(value)
    }

    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <Box sx={{ padding: 2 }} >
                <p>Estado inicial filtrado*</p>
            </Box>
            <DataGrid rows={ rows }
            ></DataGrid>
        </Box>
    );
}