import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { storage } from '../firebase.js';
import { ref, getDownloadURL, getMetadata } from "firebase/storage";
import AddImgInUSerBtn from './AddImgInUSerBtn.jsx';
import ImgFromList from './ImgFromList.jsx';

function MainImg(props) {

    const [listImgProp] = useState(props.listImgInUser);

    const [newListDat, setNewListDat] = useState([])

    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        const lenghOfArray = listImgProp.length;

        if (listImgProp) {

            for (let i = 0; i < lenghOfArray; i++) {
               const listRef1 = ref(storage, `${cookies.access_token}/${listImgProp[i]}`);
               const fetchDa = async () => {
                try {
                    const getDatUrl = await getDownloadURL(listRef1)
                    const rezult = await getDatUrl;
                    
                    const getDatName = getMetadata(listRef1)
                    const rezult2 = await getDatName;

                    setNewListDat((prevData => [...prevData, { src: rezult, name: rezult2.name }]))
                } catch (err) {
                    console.log(err)
                }    
                }
                fetchDa() 
            }  
        }
        
    }, [cookies.access_token, listImgProp]);



    const uniqueData = newListDat.filter(
        (item, index, array) => array.findIndex(obj => obj.src === item.src) === index
    );



  return (
    <div className='home-cont-for-img-and-btn'>
        <div className='cont-only-for-img'>
        {uniqueData.map((item) => {
            return (
                <ImgFromList 
                url={item.src} 
                changeButt={props.changeButt} 
                name={item.name} 
                listImgInUser={listImgProp}
                />
            )        
        })}
        </div>
        <AddImgInUSerBtn listImgInUser={listImgProp}/>
    </div>
  )
}

export default MainImg;