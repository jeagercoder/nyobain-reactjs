import { useState, useContext, useEffect } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import styles from './Style.module.css'
import { LoginStatusContext } from './context';


export const Login = () => {

    const navigate = useNavigate()

    const {loginStatus, setLoginStatus} = useContext(LoginStatusContext)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState({
        email: null,
        password: null
    })


    function handleLogin(e) {
        e.preventDefault()
        axios
        .post("http://api.dev.indothon.com/api/v1/auth/login",
        loginData,
        {withCredentials: true})
        .then(res => {
            setLoginStatus(true)
            navigate("/profile")
        })
        .catch(err => {
            setLoginError(err.response.data)
        })
    }

    return(
        <>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1>Login</h1>

                {loginError.email ? <p className={styles.errorText}>{loginError.email}</p> : null}

                <input className={styles.input}
                type="email"
                placeholder="email"
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}></input>

                {loginError.password ? <p className={styles.errorText}>{loginError.password}</p> : null}

                <input className={styles.input}
                type="password"
                placeholder="password"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value})}></input>

                <button className={styles.button}>Login</button>

            </form> 
        </div>
        </>
    )
}