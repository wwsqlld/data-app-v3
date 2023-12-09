import React, { useRef, useState } from 'react';
import { useParams} from 'react-router-dom';
import { db, storage } from '../firebase.js';
import { ref, uploadBytes } from "firebase/storage";
import { useCookies } from 'react-cookie';
import { FcPlus } from "react-icons/fc";
import { FcAdvance } from "react-icons/fc";
import { doc, updateDoc } from "firebase/firestore";



const AddImgInUSerBtn = (props) => {

  const fileInputRef = useRef(null);

  const [cookies] = useCookies(["access_token"]);
  const { id } = useParams();

  const imgListRef = doc(db, "people", `${id}`);

  const [selectFiles, setSelectFiles] = useState();

  const [selNames, setSelNames] = useState([]);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [imageUpload3, setImageUpload3] = useState(null);
  const [imageUpload4, setImageUpload4] = useState(null);
  const [imageUpload5, setImageUpload5] = useState(null);

  const listOfUs = props.listImgInUser;


  // Функция добавления изображения к челику
  const addImageInListUser = async () => {
    const newArrwidthNewElem = () => {
      if (listOfUs) {
        return (
          [...listOfUs, ...selNames]
        )
      } else {
        return (
          [...selNames]
        )
      }
    }

    try {
      await updateDoc(imgListRef, {
        images: newArrwidthNewElem()
      }).then(() => {
        console.log("Ну вроде получилось!")
      })


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
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  
  const handleContainerClick = () => {
    // Имитируем клик по input file
    fileInputRef.current.click();
  };



  const handleFileChange = (event) => {
    // Обработка выбранных файлов
    setSelectFiles(event.target.files)

    setImageUpload(event.target.files[0])
    setImageUpload2(event.target.files[1])
    setImageUpload3(event.target.files[2])
    setImageUpload4(event.target.files[3])
    setImageUpload5(event.target.files[4])

    const dataNa = Array.from(event.target.files).map((file) => file.name);
    setSelNames(dataNa);
  };



  return (
    <>
      {selectFiles ? (

        <div className='change-img-cont-non'>

          <div className='imit-add-img-btn'>
          <FcPlus size={30} onClick={handleContainerClick}/>
           <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple />
          </div>

          <div className='imit-add-img-btn' onClick={addImageInListUser}>
            <FcAdvance size={30}/> 
          </div>
        </div>

      ) : (
        <div className='change-img-cont'>
          <FcPlus size={30} onClick={handleContainerClick}/>
           <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple />
        </div>
      )}
    </>
  )
}

export default AddImgInUSerBtn
