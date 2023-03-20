import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import StockData from "./StockData";

export default function MultiActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    max-height="140"
                    image="https://investidor10.com.br/storage/companies/5ed733bc93b86.jpeg"
                    alt="BBAS3"
                   max-widht="80%"
                />
            </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h8" component="div">
                        BBAS3 - Banco do Brasil
                    </Typography>
                    <hr/>
                    <Typography variant="body2" color="text.secondary">
                        <StockData/>
                    </Typography>
                </CardContent>
        </Card>
    );
}