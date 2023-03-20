import Card from "../components/Card";
import StockList from "../components/StockList";
import {Button, Container, Paper, TextField} from "@mui/material";
import {InputOutlined} from "@mui/icons-material";
import Form from "../components/Form"
import {useState} from "react";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const todoHandler = (todo) => {
        setTodos([...todos, todo])
    }
    return (
        <div>
            <div className="wrapper">
                <Form
                    todoHandler={ todoHandler }
                />
            </div>
            <ul>
                {
                    todos.map((todo) => (
                      <li id={ todo.id }>{ todo.text }</li>
                    ))
                }
            </ul>
            <div className="wrapper">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div className="wrapper">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div className="wrapper">
                <StockList/>
            </div>
        </div>
    );
}
