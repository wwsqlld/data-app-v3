import React from 'react';
import { useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { IoRemoveCircleSharp } from "react-icons/io5";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';


const ImgFromList = (props) => {

    const name = props.name;
    const { id } = useParams();

    const arrayImages = props.listImgInUser;

    const [cookies] = useCookies(["access_token"]);

    const desertRef = ref(storage, `${cookies.access_token}/${name}`);

    const deleteImgOutUser = async () => {
        
        const imgListRef = doc(db, "people", `${id}`);
        const newAr = arrayImages.filter(element => element !== `${name}`);
        try {
            deleteObject(desertRef).then(() => {

            }).catch((error) => {
                console.log(error)
            });

            await updateDoc(imgListRef, {
                images: newAr
            }).then(() => {
                window.location.reload()
            })
            
        } catch (err) {
            console.log(err)
        }
        

    }
    
    const whenDel = () => {
        if (props.changeButt) {
            return (
                <div className='cont-image-100 anim-img' >
                    <img src={props.url} className="data-img-url" alt='Loading...'/>
                    <div className='delete-img-btn2' onClick={deleteImgOutUser}><IoRemoveCircleSharp size={20} /></div>
                </div>    
            )
        } else {
            return (
                <div className='cont-image-100 ' >
                    <img src={props.url} className="data-img-url" alt='Loading...'/>
                </div>
            )
        }
    } 

  return (
    <>
        {whenDel()}
    </>
    
  )
}

export default ImgFromList
