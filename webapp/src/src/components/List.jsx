import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'slug',
        headerName: 'Slug',
        width: 150,
        editable: true,
    },
    {
        field: 'name',
        headerName: 'Company name',
        width: 150,
        editable: true,
    },
    {
        field: 'current_price',
        headerName: 'Current price',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fundamental_value',
        headerName: 'Fundamental value',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160
    },
    {
        field: 'pvp',
        headerName: 'P/VP',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'dy',
        headerName: 'DY',
        type: 'number',
        width: 110,
        editable: true,
    },
];

export default function DataGridDemo({ rows }) {
    return (
        <Box sx={{ height: 900, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 100,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
