import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase.js';
import {useCookies} from 'react-cookie';
import { StaticInfoUser } from '../components/StaticInfoUser';
import GetStarted from '../components/GetStarted.jsx';

export const Home = () => {

    const [cookies] = useCookies(["access_token"]); 

    const [dataWithMarkList, setdataWithMarkList] = useState([]);
    const [dataWithoutMarkList, setdataWithoutMarkList] = useState([]);

    
    // Реф ссылка для базы
    const peopleCollectionRef = collection(db, "people");

    
    // Юс еффект берет данные и дальше распределяет их по двум массивам в зависимости от закладки
    useEffect(() => {
        const getPeople = async () => {
            await getDocs(query(peopleCollectionRef, where("owner", "==", `${cookies.access_token}`))).then((response) => {
                const dataList = response.docs.map((doc) => ({...doc.data(), id: doc.id }));
                const dataWith = dataList.filter(doc => doc.bookmark === true);
                const dataWithout = dataList.filter(doc => doc.bookmark === false);
                setdataWithMarkList(dataWith)
                setdataWithoutMarkList(dataWithout)
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
            <div className='bookmarked-place'>
                {dataWithMarkList.map((data) => {
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
                    />    
                    )
                })}
            </div>
            <div className='regular-place'>
              {dataWithoutMarkList.map((data) => {
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
                    />    
                )
            })}  
            </div>   
            </> 
        )}
        </div>
    )
}