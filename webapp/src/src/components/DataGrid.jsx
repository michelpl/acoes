import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'slug',
        width: 150,
        sortable: true,
        headerName: 'Slug',
        renderCell: (params: GridRenderCellParams<Date>) => (
            <strong>
                <Link href={'http://investidor10.com.br/acoes/' + params.value} target="_blank">
                    { params.value }
                </Link>
            </strong>
        )
    },
    {
        field: 'name',
        headerName: 'Company name',
        width: 150,
        sortable: true,
    },
    {
        field: 'current_price',
        headerName: 'Current price',
        type: 'number',
        width: 150,
        sortable: true,
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
        headerName: 'Fundamental value',
        description: 'This column has a value getter and is not sortable.',
        type: 'number',
        sortable: true,
        width: 160,
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
    },
    {
        field: 'growing_expectation',
        headerName: 'Growing expectation',
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
    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <DataGrid
                rows={ rows }
                columns={ columns }
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                    ...rows.initialState,
                    filter: {
                        filterModel: {
                            items: [
                                { field: 'growing_expectation', operator: '>', value: 0 },
                                { field: 'pvp', operator: '>', value: 0 },
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
