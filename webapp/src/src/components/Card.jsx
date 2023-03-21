import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions, Paper, TextField} from '@mui/material';
import StockData from "./StockData";
import {useState} from "react";

export default function MultiActionAreaCard({ data }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h8" component="div">
                    <a href={ "https://investidor10.com.br/acoes/" + data.slug } target="_blank">{ data.slug } - { data.name }</a>
                </Typography>
                <hr/>
                <Typography variant="body2" color="text.secondary">
                    <StockData data={ data }/>
                </Typography>

            </CardContent>
        </Card>
    );
}