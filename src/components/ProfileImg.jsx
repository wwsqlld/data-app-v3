import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { storage } from '../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";

function ProfileImg(props) {


    const [listIm1, setListIm1] = useState([]);

    const [listImgProp] = useState(props.listImgInUser);

    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {

        for (let i = 0; i < listImgProp.length; i++) {
            const listRef1 = ref(storage, `${cookies.access_token}/${listImgProp[i]}`);
            try {
                getDownloadURL(listRef1).then((url) => {
                    setListIm1((prev) => [...prev, url])
                });
            } catch (err) {
                console.log(err)
            }  
        }

    }, [cookies.access_token, listImgProp]);


    const uniqueArray = listIm1.filter((item, index) => {
        return listIm1.indexOf(item) === index
    });

    

    return (
        <>
            {uniqueArray.length === 0 ? (
            <div className='profile-img'></div>
                ) : (
                <div className='profile-img'>
                    <img src={uniqueArray[0]} width="100%" alt=''/>
                </div>   
            )}                    
                                    
        </>
    )    
}

export default ProfileImg;