import {useNavigate, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Style.module.css'





export const RegisterOtp = (e) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    var token = queryParams.get('token')
    
    const navigate = useNavigate()

    const [verfyOtpData, setverfyOtpData] = useState({
        otp_token: token,
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
                    <h1>tokennyo iko {verfyOtpData.otp_token}</h1>

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