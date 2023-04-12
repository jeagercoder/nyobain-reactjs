import { useState } from 'react'

import {
    Routes,
    Route
} from 'react-router-dom'

import {Home} from './home'
import { Login } from './login'
import { Navbar } from './navbar'
import {Register} from './register'
import { Profile } from './profile'
import{RegisterOtp} from './registerOtp'


import { LoginStatusContext} from './context';


export const MyRouters = () => {
    const [loginStatus, setLoginStatus] = useState(false)

    return(
        <>
        <LoginStatusContext.Provider value={{loginStatus, setLoginStatus}}>
        <Navbar/>
        <Routes>
            <Route path="/" element={<><Home/></>}></Route>
            <Route path='/login' element={<><Login/></>}></Route>
            <Route path='/register' element={<><Register/></>}></Route>
            <Route path='/profile' element={<><Profile/></>}></Route>
            <Route path='/register_otp' element={<><RegisterOtp/></>}></Route>
        </Routes>
        </LoginStatusContext.Provider>
        </>
    )
}