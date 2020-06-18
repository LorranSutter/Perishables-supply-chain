import React, { useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import styles from './styles.module.css'

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#E5E5E5"; 
        document.body.style.margin = "0";
    }, []);

    function handleLoginChange(e) {
        setLogin(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            api
                .post('login', { login, password })
                .then(res => {
                    if (res.status === 200) {
                        history.push('/battery');
                    } else {
                        history.push('/wrong', { message: 'Invalid Username/Password' });
                        return function cleanup() { }
                    }
                })
                .catch(() => {
                    history.push('/wrong', { message: 'Invalid Username/Password' });
                    return function cleanup() { }
                });
        } catch (error) {
            alert('Fail to Login! Try again.');
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.content}>
                <div className={styles.content_items}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            placeholder="Username"
                            value={login}
                            onChange={handleLoginChange}
                            required />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required />
                        <div className={styles.buttons}>
                            <a>
                                <button id="buttonLogin">
                                    Login
                                </button>
                             </a>
                            <Link to="/">
                                <button id="buttonCancel">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;