import * as React from 'react';
import Box from '@mui/material/Box';
import DataGrid from './StockDataGrid';
import {useState} from "react";
import {Image} from "@mui/icons-material";

export default function DataGridDemo({ rows }) {
    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <Box sx={{ padding: 2 }} >
                <ul>
                    <li> { 'P/L < 15' } </li>
                    <li>{ 'ROE > 10%' }</li>
                    <li>{ 'Margem líquida > 10%' } </li>
                    <li>{ 'Dívida líquida / EBITDA <= 3' }</li>
                    <li>{ 'CAGR Receitas 5 anos > 0%' }</li>
                </ul>
            </Box>
            <DataGrid rows={ rows }
            ></DataGrid>
        </Box>
    );
}