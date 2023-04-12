import { useState, useEffect, useContext } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import styles from './Style.module.css'
import { LoginStatusContext } from './context';


export const Profile = () => {

    const navigate = useNavigate()

    const {loginStatus, setLoginStatus} = useContext(LoginStatusContext)
    const [userData, setUserData] = useState({
        uuid: "",
        username: "",
        first_name: "",
        last_name: "",
        email: ""
    })

    useEffect(() => {
        axios
        .get('http://api.dev.indothon.com/api/v1/auth/profile',
        {withCredentials: true})
        .then(res => {
            setUserData(res.data)
        })
        .catch(err => {
            setLoginStatus(false)
            navigate("/login")
        })
    }, [])

    return(
        <>
        <div className={styles.container}>
            <h1>My profile</h1>
            <div className={styles.profile}>
                <h3>Username: {userData.username}</h3>
                <h5>First Name: {userData.first_name}</h5>
                <h5>Last Name: {userData.last_name}</h5>
                <h5>Email: {userData.email}</h5>
            </div>
        </div>
        </>
    )
}