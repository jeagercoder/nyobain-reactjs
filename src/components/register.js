import { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import styles from './Style.module.css'



const RegisterOtp = (e) => {

    const navigate = useNavigate()

    const [verfyOtpData, setverfyOtpData] = useState({
        otp_token: e.token,
        otp_code: ""
    })



    const [otpError, setOtpError] = useState(null)

    function handleOtpVerify(e) {
        e.preventDefault()
        axios
            .post("http://api.dev.indothon.com/api/v1/auth/register_otp",
                verfyOtpData,
                { withCredentials: true })
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                setOtpError(err.response.data.otp_code)
            })
    }

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalBox}>
                    <form className={styles.form} onSubmit={handleOtpVerify}>
                    <h1>Verify OTP</h1>

                        {otpError ?
                        <p className={styles.errorText}>{otpError}</p> : null}

                        <input className={styles.input}
                            type="text"
                            placeholder="otp code"
                            onChange={(e) => setverfyOtpData({ ...verfyOtpData, otp_code: e.target.value })}></input>

                        <button className={styles.button}>Verify</button>

                    </form>
                </div>
            </div>
        </>
    )
}


export const Register = () => {

    const [tokenOtp, setTokenOtp] = useState()

    const [registerData, setRegisterData] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "email": "",
        "password": ""
    })
    const [registerError, setRegisterError] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "email": "",
        "password": ""
    })

    const navigate = useNavigate()

    function handleRegister(e) {
        e.preventDefault()
        axios
            .post("http://api.dev.indothon.com/api/v1/auth/register",
                registerData,
                { withCredentials: true })
            .then(res => {
                navigate('/register_otp?token='+res.data.otp_token)
            })
            .catch(err => {
                setRegisterError(err.response.data)
            })
    }

    return (
        <>
            {tokenOtp ? <RegisterOtp token={tokenOtp}/> : null}
            <div className={styles.container}>
                
                <form className={styles.form} onSubmit={handleRegister}>
                    <h1>Register</h1>

                    {registerError.first_name ?
                        <p className={styles.errorText}>{registerError.first_name}</p> : null}

                    <input className={styles.input}
                        type="text"
                        placeholder="first name"
                        onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })}></input>

                    {registerError.last_name ?
                        <p className={styles.errorText}>{registerError.last_name}</p> : null}

                    <input className={styles.input}
                        type="text"
                        placeholder="last name"
                        onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })}></input>

                    {registerError.username ?
                        <p className={styles.errorText}>{registerError.username}</p> : null}

                    <input className={styles.input}
                        type="text"
                        placeholder="username"
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}></input>

                    {registerError.email ?
                        <p className={styles.errorText}>{registerError.email}</p> : null}

                    <input className={styles.input}
                        type="email"
                        placeholder="email"
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}></input>

                    {registerError.password ?
                        <p className={styles.errorText}>{registerError.password}</p> : null}

                    <input className={styles.input}
                        type="password"
                        placeholder="password"
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}></input>

                    <button className={styles.button}>Register</button>

                </form>
            </div>
        </>
    )
}