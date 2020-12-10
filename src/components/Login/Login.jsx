import axios from 'axios';
import './Login.css';
import jwt from 'jwt-decode';

import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post('https://proy-videoclub-api.herokuapp.com/login', { name, password })
            localStorage.setItem('token', res.data.sucess);
            console.log(jwt(res.data.sucess));
            console.log(res);
            console.log(res.data);
            alert("Login OK")
            history.push('/')
        } catch (error) {
            console.error(error)
            alert("Login Failed")
        }

    }
    return (
        <form className="register" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" onChange={event => setName(event.target.value)} name="name" placeholder="Introduce your name" value={name} />
            <input type="password" onChange={event => setPassword(event.target.value)} name="password" placeholder="Introduce your password" value={password} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;