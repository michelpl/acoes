import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Button, Link} from "@mui/material";
import Icon from '@mui/material/Icon';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'slug',
        headerName: 'Slug',
        width: 150,
        sortable: true,
        editable: true,
    },
    {
        field: 'name',
        headerName: 'Company name',
        width: 150,
        sortable: true,
        editable: true,
    },
    {
        field: 'current_price',
        headerName: 'Current price',
        type: 'number',
        width: 150,
        sortable: true,
        editable: true,
    },
    {
        field: 'fundamental_value',
        headerName: 'Fundamental value',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
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
        sortable: true,
        editable: true
    }
];

const content = (slug) => {
    return <Button variant="text">Text</Button>
}

export default function DataGridDemo({ rows }) {
    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight={ true }
            />
        </Box>
    );
}
