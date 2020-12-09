import axios from 'axios';
import './Login.css';

import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post('http://localhost:3001/users/login', { name, password })
            localStorage.setItem('token', res.data.token)
            alert("Login OK")
            props.setUser(res.data.user)
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