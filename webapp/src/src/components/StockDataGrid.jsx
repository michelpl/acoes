import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "@mui/material";
import {useState} from "react";

function getImage(params) {
    return <Box
        component="img"
        sx={{
            maxWidth: 30,
        }}
        src={ 'logos/' + params.row.slug + ".jpeg" || '' }
    />;
}

const columns: GridColDef[] = [
    {
        field: 'logo',
        width: 30,
        sortable: false,
        filterable: false,
        editable: false,
        renderCell: getImage
    },
    {
        field: 'slug',
        width: 70,
        sortable: true,
        headerName: 'Slug',
        renderCell: (params: GridRenderCellParams<String>) => (
            <strong>
                <Link href={'http://investidor10.com.br/acoes/' + params.value} target="_blank">
                    { params.value }
                </Link>
            </strong>
        )
    },
    {
        field: 'name',
        headerName: 'Nome',
        width: 120,
        sortable: true
    },
    {
        field: 'current_price',
        headerName: 'Preço atual',
        type: 'number',
        width: 140,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            var valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `R$ ${valueFormatted}`;
        }
    },
    {
        field: 'fundamental_value',
        headerName: 'Valor justo',
        type: 'number',
        sortable: true,
        width: 160,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            var valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `R$ ${valueFormatted}`;
        },
    },
    {
        field: 'pvp',
        headerName: 'P/VP',
        type: 'number',
        width: 110,
        sortable: true
    },
    {
        field: 'growing_expectation',
        headerName: 'Crescimento provável',
        type: 'number',
        width: 150,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'dy',
        headerName: 'DY',
        type: 'number',
        width: 110,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted =
                new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'pl',
        headerName: 'P/L',
        type: 'number',
        width: 90,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted}`;
        },
    },
    {
        field: 'roe',
        headerName: 'ROE',
        type: 'number',
        width: 130,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'net_margin',
        headerName: 'Margem líquida',
        type: 'number',
        width: 110,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'net_debt_ebitda',
        headerName: 'Dívida líquida / EBITIDA',
        type: 'number',
        width: 130,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'updated_at',
        headerName: 'Updated at',
        type: 'dateTime',
        width: 110,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const date = new Date(params.value);
            return(date.toLocaleString('pt-BR', { timezone: 'UTC' }));
        },
    }
];

export default function DataGridDemo({ rows }) {
    const [pageSize, setPageSize] = useState(50);

    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <DataGrid
                rows={ rows }
                columns={ columns }
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize:  pageSize
                        },
                    },
                    ...rows.initialState,
                    filter: {
                        filterModel: {
                            items: [
                            ],
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'growing_expectation', sort: 'desc' }],
                    },
                }}
                stat
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight={ true }
            />
        </Box>
    );
}
