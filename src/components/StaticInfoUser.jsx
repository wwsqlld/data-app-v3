import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { storage } from '../firebase.js';
import {useCookies} from 'react-cookie';
import { AiOutlineUser } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";


export const StaticInfoUser = (props) => {

    const [cookies] = useCookies(["access_token"]);

    const [listImgInUser] = useState(props.images);

    const [listIm1, setListIm1] = useState([]);

    const [ifBooked, setIfBooked] = useState(props.bookmark);
    const [dL, setDL] = useState(props.dataList);


    const toggleActiveById = (id) => {
        setDL(prevArray => prevArray.map(item => {
            if (item.id === id) {
                return { ...item, bookmark: !item.bookmark }; // Изменяем значение параметра active
            }
            return item;
        }));
        setDL(prevArray => prevArray.sort((a, b) => (a.bookmark === b.bookmark) ? 0 : a.bookmark ? -1 : 1))
    };

    const changeBookPoint = async () => {
        const descRef = doc(db, "people", `${props.id}`);
         try {
            await updateDoc(descRef, {
                bookmark: !ifBooked
            }).then(() => {
                setIfBooked(!ifBooked)
                toogleActiveById(props.id)
                
            })
        } catch (err) {
            console.log(err)
        }   
    }
    

    useEffect(() => {
        if (listImgInUser) {
            for (let i = 0; i < listImgInUser.length; i++) {
                const listRef1 = ref(storage, `${cookies.access_token}/${listImgInUser[i]}`);
                getDownloadURL(listRef1).then((url) => {
                    setListIm1((prev) => [...prev, url])
                }) 
            }    
        }
    },[cookies.access_token, listImgInUser]);

    const uniqueArray = listIm1.filter((item, index) => {
        return listIm1.indexOf(item) === index
    });







  return (
    <>
        <div className='home-container' key={props.id}>
            <div className='home-cont-small-1'>
                <Link to={`/person/${props.id}`} style={{ textDecoration: 'none'}} >
                    {uniqueArray.length === 0 ? (
                        <div className='profile-img' style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <AiOutlineUser size={100} color="black"/>
                        </div>
                    ) : (
                    <div className='profile-img'>
                        <img src={uniqueArray[0]} width="200px" alt=''/>     
                    </div>     
                    )}  
                </Link>
                <Link to={`/person/${props.id}`} style={{ textDecoration: 'none'}} >
                    <div className='profile-data'>
                        <p className='txt-data-user'>Full Name: {props.fullName}</p>
                        <p className='txt-data-user'>Country: {props.country}</p>
                        <p className='txt-data-user'>Date of Birthday: {props.dateOfBirth}</p>
                        <p className='txt-data-user'>Phone Number: {props.phone}</p>
                    </div>
                </Link>

                <div className='book-marks-container'>
                        <div className='bk-cont'>
                            {ifBooked ? (
                                <FaBookmark size={25} style={{ color: 'black' }} onClick={() => changeBookPoint()}/>
                            ) : (
                                <FaRegBookmark size={25} style={{ color: 'black' }} onClick={() => changeBookPoint()}/>
                            )}   
                        </div>
                </div>
            </div> 
       </div> 
    </>
  );
};
