import { useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Style.module.css';

import { LoginStatusContext } from './context';


export const Navbar = () => {

    const {loginStatus, setLoginStatus} = useContext(LoginStatusContext)

    const navigate = useNavigate()

    useEffect(() => {
        const cookies = document.cookie.split(";")
        for (let n = 0; n < cookies.length; n++) {
            const cookie_name = cookies[n].split("=")[0]
            if (cookie_name === "session") {
                if ( cookies[n].split("=")[1].length > 0) {
                    setLoginStatus(true)
                } else { setLoginStatus(false) }
            }
        }
    }, [])

    function HandleLogout() {
        axios
        .get("http://api.dev.indothon.com/api/v1/auth/logout",
        {withCredentials: true})
        .then(res => {
            setLoginStatus(false)
            navigate("/login")
        })
    }

    return(
        <>
        <div className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <ul className={styles.navList}>
                { !loginStatus ?
                (<>
                    <li className={styles.navItem}>
                        <Link to="/login">Login</Link>
                    </li> 
                    <li className={styles.navItem}>
                        <Link to="/register">Register</Link>
                    </li>
                </>)
                :
                (<>
                    <li className={styles.navItem}>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link onClick={HandleLogout}>Logout</Link>
                    </li>
                </>)
                }
            </ul>
        </div>
        </>
    )
}