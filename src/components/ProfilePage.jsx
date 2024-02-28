import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../firebase.js';
import { useCookies } from 'react-cookie';
import { RxAvatar } from "react-icons/rx";

const ProfilePage = () => {

    const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);

    const profileRef = collection(db, "displayProfiles");

    

    const [dataAH, setDataAH] = useState();
    const [dataEP, setDataEP] = useState();

    const [profileAsi, setProfileAsi] = useState({
        displayName: '',
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        const storedDataEP = JSON.parse(localStorage.getItem('dataEP'));

        const getProfile = async () => {
            await getDocs(query(profileRef, where("email", "==", `${storedDataEP.email}`)))
            .then((response) => {
                const dataRN = response.docs.map((doc) => (doc.data()))
                setProfileAsi({
                    displayName: dataRN[0].displayName,
                })
            })
        }

        if (storedDataEP) {
            getProfile()
        }
        

        setDataAH(storedData);
        setDataEP(storedDataEP);
    },[profileRef]);



    // Функция выхода из учетной записи
    const logOut = async () => {
        removeCookie("access_token");
        localStorage.clear();
        try {
            await signOut(auth).then(() => {
              window.location.reload()  
            })   
        } catch (err) {
            console.log(err)
        }
    }


    const uploadData = () => {
        if (dataAH) {
           return (
            <>
                <img src={dataAH.photoURL} alt="" style={{width:"100px", height:"100px"}}/>
                <p>Name: {dataAH.displayName}</p>
                <p>Email and Info: {dataAH.email}</p>
                <input type="text" placeholder='A country' id='country' className='create-data-inp' name='country' ></input>
                <button className='logOutButt' onClick={logOut}>Log Out</button>
                <input type="text" placeholder='A country' id='country' className='create-data-inp' name='country' ></input>
                
            </>
           ) 
        } else if (dataEP) {
            return (
            <>
              <RxAvatar size={100}/>
              <p>Display Name: {profileAsi.displayName}</p>
              <p>Email: {dataEP.email}</p>
              <button className='logOutButt' onClick={logOut}>Log Out</button> 
            </> 
            )
        }
        else {
            return (
                null
            )
        }
    }



  return (
    <div className='profile-page'>
        {uploadData()}
    </div>
  )
}

export default ProfilePage
