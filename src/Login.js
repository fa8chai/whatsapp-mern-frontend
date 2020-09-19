import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import './Login.css';
import { auth, provider } from './firebase';
import { setUser } from './reduxConfig/actions';


function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => (
            dispatch(setUser(result.user))
        ))
        .catch(error => alert(error.message))
    };
    return (
        <div className='login'>
            <div className='login__container'>
                <img 
                    src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
                    alt=''
                />
                <div className='login__text'>
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
