import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useCookies } from 'react-cookie';
import NoDataWindow from '../components/NoDataWindow.jsx';

import ErrorBlock from '../components/ErrorBlock.jsx';

import {animateScroll as scroll } from 'react-scroll';



export const CreateData = () => {

  const [cookies] = useCookies(["access_token"]);
  const peopleCollectionRef = collection(db, "people");

  // Хуки чисто для вывода ошибки
  const [errorMenu, setErrorMenu] = useState(false);
  const [errorT, setErrorT] = useState('');
  const [errorB, setErrorB] = useState(false);


  // Прокрутка вверх
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  

  // форма в конструкторе
  const [dataOfUser, setDataOfUser] = useState({
    fullName: "",
    dateOfBirth: "",
    country: "",
    phone: "",
    description: null,
    owner: cookies.access_token,
    images: null,
    bookmark: false
  });

  // хуки для изображений
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [imageUpload3, setImageUpload3] = useState(null);
  const [imageUpload4, setImageUpload4] = useState(null);
  const [imageUpload5, setImageUpload5] = useState(null);



  // Функция отправки данных на сервер
  const sendDataOfUser = async () => {
    if (dataOfUser.fullName && dataOfUser.country) {
      try {
      await addDoc(peopleCollectionRef, dataOfUser);
      
      if (imageUpload) {
        const imageRef = ref(storage, `${cookies.access_token}/${imageUpload.name}`);
        await uploadBytes(imageRef, imageUpload);
      }
      if (imageUpload2) {
        const imageRef2 = ref(storage, `${cookies.access_token}/${imageUpload2.name}`);
        await uploadBytes(imageRef2, imageUpload2);
      }
      if (imageUpload3) {
        const imageRef3 = ref(storage, `${cookies.access_token}/${imageUpload3.name}`);
        await uploadBytes(imageRef3, imageUpload3);
      }
      if (imageUpload4) {
        const imageRef4 = ref(storage, `${cookies.access_token}/${imageUpload4.name}`);
        await uploadBytes(imageRef4, imageUpload4);
      }
      if (imageUpload5) {
        const imageRef5 = ref(storage, `${cookies.access_token}/${imageUpload5.name}`);
        await uploadBytes(imageRef5, imageUpload5);
      }
      scrollToTop()
      showError("Data has been created", true)
      } catch (err) {
        console.log(err)
      } 
    } else {
      showError("Name and country are required!", false)
      scrollToTop()
    }
    
  }


  // Функция которая заполняет форму 
  const handleChange = (event) => {
    const {name, value} = event.target;
    setDataOfUser({...dataOfUser, [name]: value})
  };


  // Функция которая заполняет фотографии
  const handleChange2 = (event) => {
    setImageUpload(event.target.files[0])
    setImageUpload2(event.target.files[1])
    setImageUpload3(event.target.files[2])
    setImageUpload4(event.target.files[3])
    setImageUpload5(event.target.files[4])

    const dataNa = Array.from(event.target.files).map((file) => file.name)
    
    setDataOfUser({...dataOfUser, images: dataNa })  
  };


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
    <div className='create-data'>
      {!cookies.access_token ? (


        <NoDataWindow />


      ) : (
      <>

      {
          errorMenu ? (
          <ErrorBlock title={errorT} boolen={errorB}/>      
          ) : (
          <></>
          )   
      }


      <div className='create-data-container'>
        <div className='title-dat-top'>
          <h1>Fill the Form</h1>
        </div>
        

        <div className='data-cont-small'>
          <input value={dataOfUser.fullName} type="text" placeholder='Full Name:' id='fullName' className='create-data-inp' name='fullName' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <input id='dateOfBirth' className='create-data-inp' type='date' name='dateOfBirth' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <input type="text" placeholder='A country' id='country' className='create-data-inp' name='country' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <input type="text" placeholder='Phone number' id='phone' className='create-data-inp' name='phone' onChange={(handleChange)}></input>
        </div>
        <div className='data-cont-small'>
          <textarea placeholder='Description' id='data-area' name='description' onChange={(handleChange)}></textarea>
        </div>
        <div className='data-cont-small'>
          <label for="data-files" style={{ marginBottom: '5px' }}>Images:</label>
          <input id='data-files' type='file' multiple onChange={(handleChange2)}></input>
          <p>A maximum of 5 files can be uploaded at a time.</p>
          
        </div>
        <div className='data-btn-cont'>
          <button id='data-btn' onClick={sendDataOfUser}>Confirm</button>
        </div>
      </div>
      </>
    )}
    </div>   
  )
}
