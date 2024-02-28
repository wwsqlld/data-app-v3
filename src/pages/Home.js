import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase.js';
import {useCookies} from 'react-cookie';
import { StaticInfoUser } from '../components/StaticInfoUser';
import GetStarted from '../components/GetStarted.jsx';

export const Home = () => {

    const [cookies] = useCookies(["access_token"]); 

    const [dataList, setDataList] = useState([]);

    const sortAr = dataList.sort((a, b) => (a.bookmark === b.bookmark) ? 0 : a.bookmark ? -1 : 1);

    
    // Реф ссылка для базы
    const peopleCollectionRef = collection(db, "people");

    
    // Юс еффект берет данные и дальше распределяет их по двум массивам в зависимости от закладки
    useEffect(() => {
        const getPeople = async () => {
            await getDocs(query(peopleCollectionRef, where("owner", "==", `${cookies.access_token}`))).then((response) => {
                const dataList = response.docs.map((doc) => ({...doc.data(), id: doc.id }));
                const SortData = dataList.sort((a, b) => (a.bookmark === b.bookmark) ? 0 : a.bookmark ? -1 : 1);
                setDataList(dataList)
            })
        }
        getPeople();
    }, [peopleCollectionRef, cookies.access_token]);

    




    return (
        <div className='home'>
            {!cookies.access_token ? (


                <GetStarted />


            ) : ( 
            <>
            <div className='regular-place'>
              {sortAr.map((data) => {
                return (
                    <StaticInfoUser 
                    id={data.id} 
                    fullName={data.fullName} 
                    country={data.country} 
                    dateOfBirth={data.dateOfBirth} 
                    phone={data.phone} 
                    description={data.description} 
                    images={data.images}
                    bookmark={data.bookmark}
                    dataList={sortAr}
                    />    
                )
            })}  
            </div>   
            </> 
        )}
        </div>
    )
}
