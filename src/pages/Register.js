import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { auth } from '../firebase.js';
import {useCookies} from 'react-cookie';

import { BiError } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BiX } from "react-icons/bi";

import ErrorBlock from '../components/ErrorBlock.jsx';

export const Register = () => {

    // куки
    const [cookies] = useCookies(["access_token"]);

    // Рефы и навигация
    const navigate = useNavigate();
    const myRef = useRef();

    // Это для модельного окна ошибок
    const [errorMenu, setErrorMenu] = useState(false);
    const [errorT, setErrorT] = useState('');
    const [errorB, setErrorB] = useState(false);

    // Данные в форму
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const displayProfilesCollectionRef = collection(db, "displayProfiles");
    
    
    // функция регистрации 
    const RegisterUser = async () => {
        if (email && password && email.indexOf('@') !== -1 && password.length >= 8 && password === password2 && displayName) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                    console.log(error.code)
                    if (error.code === "auth/invalid-email") {
                        showError('Invalid Email', false)
                    } else if (error.code === "auth/email-already-in-use") {
                        showError('A user with this email is already registered', false)
                    }
                });
                const profileData = {
                    displayName: `${displayName}`,
                    email: `${email}`
                }
                await addDoc(displayProfilesCollectionRef, profileData).then(() => {
                    showError('Successful registration', true)
                })
                .catch((error) => {
                    console.log(error.code)
                });

            } catch (err) {
                console.log(err)
            }
        } else {
            showError('Registration error', false)
        }
    }


    // функция перенаправления 
    useEffect(() => {
        if (cookies.access_token) {
            navigate('/')
        }
        if (!cookies.access_token) {
           myRef.current.focus(); 
        }
    }, [cookies.access_token, navigate])




    // функция которая понимает сколько символов в пароле и дает определеный ответ!
    const getBasedOnLength = () => {
        const passwordLength = password.length;
        const passwordLength2 = password2.length;
    
        if (passwordLength >= 8 && passwordLength2 >= 8) {
          return (
            <div className='requirements-container'>
                <BiCheck style={{ color: 'green' }}/>
                <p style={{ 
                    color: 'black', 
                    textAlign: 'center', 
                    margin: '0', 
                    fontSize: '12px' 
                }}>Password must contain at least 8 characters</p>    
            </div>
          )
        } else if (passwordLength === 0) {
              return (
                null
              )
        } else {
           return (
               <div className='requirements-container'>
                    <BiError style={{ color: 'red' }} />
                    <p style={{ 
                    color: 'black', 
                    textAlign: 'center', 
                    margin: '0', 
                    fontSize: '12px' 
                    }}>Password must contain at least 8 characters</p>
               </div>
            ) 
        }
      };



      // функция для отображения ошибки
    const showError = (title, boo) => {
        setErrorMenu(true)
        setErrorT(title)
        setErrorB(boo)
        setTimeout(() => {
            setErrorMenu(false)
        }, 5000)
    };



    // функция которая определяет сколько символов в пароле и дает ответ
    const getBasedOnInp = (pass) => {
        const passwordLength = pass.length;
    
        if (passwordLength >= 8) {
          return (
            <BiCheck size={20} style={{ color: 'green' }}/>
          )
        } else if (passwordLength === 0) {
              return (
                <div className='simulat-cont'></div>
              )
        } else {
            return (
                <BiX size={20} style={{ color: 'red' }}/>
            ) 
        }
    };




    // функция которая определяет совпадают ли пароли
    const getBasedOnIdenti = () => {
    
        if ( password.length > 0 && password2.length > 0 && password === password2) {
          return (
            <div className='requirements-container'>
                <BiCheck style={{ color: 'green' }}/>
                <p style={{ 
                    color: 'black', 
                    textAlign: 'center', 
                    margin: '0', 
                    fontSize: '12px' 
                }}>Passwords must match each other</p>    
            </div>
          )
        } else if (password.length === 0 || password2 === 0) {
              return (
                null
              )
        } else {
           return (
               <div className='requirements-container'>
                    <BiError style={{ color: 'red' }} />
                    <p style={{ 
                    color: 'black', 
                    textAlign: 'center', 
                    margin: '0', 
                    fontSize: '12px' 
                    }}>Passwords must match each other</p>
               </div>
            ) 
        }
      };






    return (
        <div className='auth'>
        {
            errorMenu ? (
            <ErrorBlock title={errorT} boolen={errorB}/>      
            ) : (
            <></>
            )
        }
          

            



            <div className='auth-container'>
                
                <h1 style={{ marginBottom: '50px' }}>Create New Account</h1>
                <div className='auth-cont2'>
                    <div className='inp-container'>
                        <div className='simulat-cont'></div>
                        <input ref={myRef} placeholder='Display Name' value={displayName} className='dat-inp' onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <div className='inp-container'>
                        <div className='simulat-cont'></div>
                        <input placeholder='Email' value={email} className='dat-inp' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='inp-container'>
                        {getBasedOnInp(password)}
                        <input placeholder='Password' value={password} className='dat-inp' type='password'  onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <div className='inp-container'>
                        {getBasedOnInp(password2)}
                        <input placeholder='Password confirmation' value={password2} className='dat-inp' type='password'  onChange={(e) => {setPassword2(e.target.value)}} />
                    </div>
                    
                    
                    
                    
                
                        {getBasedOnLength()}
                        {getBasedOnIdenti()}
                          
                    
                    <div className='help-txt-container'>
                        <p style={{ color: 'black', textAlign: 'center', margin: '0', fontSize: '14px' }}>Already have an account?</p>
                        <Link to='/auth' className='link-btn-wr' >Sign In</Link>
                    </div>
                    
                    <button className='sign-btn' onClick={RegisterUser}>Register</button>
                </div>
            </div>
        </div>
    )
}