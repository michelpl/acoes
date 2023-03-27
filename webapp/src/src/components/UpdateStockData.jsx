
import * as React from 'react';
import {
    Backdrop,
    Button,
    CardActionArea,
    CardActions,
    CircularProgress,
    InputLabel,
    MenuItem, Paper,
    Select
} from '@mui/material';

export default function UpdateStockData() {
    const [skip, setSkip] = React.useState(0);
    const [take, setTake] = React.useState(1);

    const updateStockData = () => {
        handleToggle();

        let jsonData = {
            "skip": skip,
            "take": take
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };

        fetch('http://localhost:8000/api/V1/update-stock-list', requestOptions)
        .then(response => console.log(response))
        .then(close => handleClose());
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>

            <Paper style={{ padding: 15, alignContent: "center", verticalAlign: "center" }}>
                <InputLabel id="demo-simple-select-label">Skip</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={skip}
                    label="Skip"
                    fullWidth={true}
                    onChange={(e) => ( setSkip(e.target.value) ) }
                >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                </Select>
                <InputLabel id="demo-simple-select-label">Take</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    value={take}
                    label="Take"
                    fullWidth={true}
                    onChange={(e) => ( setTake(e.target.value) ) }
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                </Select>
                <Button
                    fullWidth={true}
                    variant="contained" onClick={updateStockData} color="secondary">Atualizar dados externos</Button>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Paper>
        </div>
    );
}