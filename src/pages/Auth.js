import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase.js';
import { useCookies } from 'react-cookie';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import ErrorBlock from '../components/ErrorBlock.jsx';
import ProfilePage from '../components/ProfilePage.jsx';

export const Auth = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPass, setShowPass] = useState(false);

    const [cookies, setCookies] = useCookies(["access_token"]);

    const [errorMenu, setErrorMenu] = useState(false);
    const [errorT, setErrorT] = useState('');
    const [errorB, setErrorB] = useState(false);

    // Чтоб input был нажат при загрузке страницы
    const myRef1 = useRef();
    


    // Вход с использованием почты и пароля
    const signInWithEmail = () => {
        if (email && password && email.indexOf('@') !== -1) {
        try {
            signInWithEmailAndPassword(auth, email, password).then((response) => {
                setCookies("access_token", response.user.uid, { maxAge: 86400 });
                const dataEP = {
                    email: response.user.email,
                }
                localStorage.setItem('dataEP', JSON.stringify(dataEP));
            }).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    showError('User not found', false)
                }
                if (error.code === "auth/invalid-email") {
                    showError('Invalid Email', false)
                }
                if (error.code === "auth/too-many-requests") {
                    showError('Too many requests', false)
                }
                if (error.code === "auth/wrong-password") {
                    showError('Wrong password', false)
                }
               console.log(error) 
            })
        } catch (error) {
            console.error("Ошибка аунтификации:", error.message)
        }  
        }
        else {
            showError('Login failed', false)
        }
        
    }


    // Вход через гугл
    const signInWithGoogle = async () => {
        try {
           const result = await signInWithPopup(auth, provider);
           setCookies("access_token", result.user.uid, { maxAge: 86400 });
           console.log(result.user)
           const dataLg = {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
           }
           localStorage.setItem('data', JSON.stringify(dataLg));
        } catch (err) {
            console.log(err)
        }
        
    }



    // ХАХАХХАХАХАХАХАХ Юз еффект
    useEffect(() => {
        if (!cookies.access_token) {
            myRef1.current.focus(); 
         } 
    }, [cookies.access_token]);



      // функция для отображения ошибки
      const showError = (title, boo) => {
        setErrorMenu(true)
        setErrorT(title)
        setErrorB(boo)
        setTimeout(() => {
            setErrorMenu(false)
        }, 5000)
    }




    return (
        
        <div className='auth'>
            
        {
            errorMenu ? (
            <ErrorBlock title={errorT} boolen={errorB}/>      
            ) : (
            <></>
            )   
        }

            {cookies.access_token ? (

            <ProfilePage />

            ) : (

            <div className='auth-container'>
                <h1>Sign In</h1>
                <div className='auth-cont1'>
                    <div className='google-auth' onClick={signInWithGoogle}>
                        <FcGoogle size='40px' style={{ marginTop: '4px' }} />
                    </div>
                </div>
                
                <div className='auth-cont2'>
                    <input ref={myRef1} placeholder='Email' className='dat-inp' type='email' onChange={(e) => setEmail(e.target.value)} />
                    <div className='input-pass-cont'>
                        <input placeholder='Password' className='dat-inp' type={!showPass ? ('password') : ('text')} onChange={(e) => setPassword(e.target.value)} /> 
                        <div className='show-hide-pass-cont' onClick={() => setShowPass(!showPass)}>
                            {!showPass ? (
                                <FaEye size={20}/>  
                            ) : (
                                <FaEyeSlash size={20}/>
                            )}
                            
                        </div>
                    </div>
                    
                    
                    
                    <div className='help-txt-container'>
                        <p style={{ color: 'black', textAlign: 'center', margin: '0', fontSize: '14px' }}>Don't have an account?</p>
                        <Link to='/register' className='link-btn-wr' >Register</Link> 
                    </div>
                    
                    <button className='sign-btn' onClick={signInWithEmail}>Log In</button>
                </div>
            </div>
            )}
        </div>
        
    )
}