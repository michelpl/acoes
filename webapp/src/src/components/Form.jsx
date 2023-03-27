import {Alert, Button, Link, Paper, TextField} from "@mui/material";
import React, {useState} from "react";
import ComboBox from "./Combobox";
import FiisList from './FiisList'
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import {random} from "@mui/x-data-grid-generator";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Form({ todoHandler }) {

    const [current, setCurrent] = useState(0);
    const [dividend, setDividend] = useState(0);
    const [monthly, setMonthly] = useState("0%");
    const [yearly, setYearly] = useState("0%");
    const [count, setCount] = React.useState(0);

    const getFiis = async () => {
        const result = fetch('http://localhost:8000/api/V1/fii')
            .then(response => response.json())
            .then(json => mapFiis(json))
    }

    const mapFiis = async (result) => {
        let newList = [];

        result.map((row) => {
            newList.push({label: row.slug, id: row.id})
        });

        setList(newList);
        return newList;
    }

    const [list, setList] = useState(getFiis);

    const calculatePercentage = (current, dividend) => {
        let monthly = (dividend * 100 / current).toFixed(2);
        let yearly = ((((1 + monthly /100) **12) -1) * 100).toFixed(2);

        setMonthly(monthly);
        setYearly(yearly);
    }

    const [value, setValue] = React.useState(list[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [todos, setTodos] = useState([]);
    const addTodo = () => {
        var newTodo = {
            'id': inputValue,
            'price': current,
            'dividend': dividend,
            'count': count,
            'total': current * count,
            'monthly': monthly,
            'class': 'fiis',
            'yearly': yearly

        }

        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        var filtered = todos.filter((todo) => todo.id !== id);
        setTodos(filtered);
    };

    const deleteAll = () => {
        setTodos([]);
    };

    return (
        <Paper style={{ padding: 15, alignContent: "center", verticalAlign: "center" }}>
            <h3>Rentabilidade</h3>
            <div>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={list}
                    sx={{ marginBottom: 2 }}
                    renderInput={(params) => <TextField {...params} label="Controllable" />}
                />
            </div>
            <div>
                <TextField
                    fullWidth={true}
                    type="number"
                    style={{ marginBottom: 10}}
                    id="current"
                    label="Valor comprado"
                    onChange={
                        (e) => { setCurrent(e.target.value); calculatePercentage(e.target.value, dividend)}
                    }
                >
                </TextField>
            </div>
            <div>
                <TextField
                    fullWidth={true}
                    style={{ marginBottom: 10}}
                    id="dividend"
                    type="number"
                    min="0"
                    label="Dividendo"
                    onChange={
                        (e) => { setDividend(e.target.value);  calculatePercentage(current, e.target.value);}
                    }
                >
                </TextField>
            </div>
            <div>
                <TextField
                    fullWidth={true}
                    style={{ marginBottom: 10}}
                    id="count"
                    type="number"
                    min="0"
                    label="Número de cotas"
                    onChange={
                        (e) => { setCount(e.target.value) }
                    }
                >
                </TextField>
            </div>
            <div>
                <Alert severity="success">{ "Rentabilidade mensal: " + monthly + '%' } | { "Rentabilidade anual: " + yearly + '%' } </Alert>
            </div>
            <div>
                <Button fullWidth={true} variant="contained" onClick={addTodo} >Salvar</Button>
                <Button fullWidth={true} variant="contained" onClick={deleteAll} >Limpar lista</Button>
            </div>
            <div>
                <List>
                    {todos.map((item) => (
                        <ListItem
                            key={item.id}
                            disablePadding
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                        <ListItemButton role={undefined}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': item.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText sx={{ marginRight: '15' }} id={item.id} primary={ <Link href={"https://investidor10.com.br/" + item.class + '/' + item.id} target="__blank"> { item.id } </Link> }  />
                                <ListItemText sx={{ marginLeft: '15' }} id={item.id} primary={ 'Valor compra: R$' + item.price } />
                                <ListItemText sx={{ marginLeft: '15' }} id={item.id} primary={ 'Dividendo: ' + item.dividend + '%' } />
                                <ListItemText sx={{ marginLeft: '15' }} id={item.id} primary={ 'Dividendo total: R$' + item.total } />
                                <ListItemText sx={{ marginLeft: '15' }} id={item.id} primary={ 'Porcentagem rendimento mensal: ' + item.monthly + '%' } />
                                <ListItemText sx={{ marginLeft: '15' }} id={item.id} primary={ 'Porcentagem rendimento anual: ' + item.yearly + '%' } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Paper>
    );
}