import React from 'react';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className='get-started-page'>
      <div className='get-started-container'>
        <div className='gt-cont-if'>
            <p>Create unique cards, share information and gain new experience in managing your data.</p>
            <Link to='/auth' style={{ textDecoration: 'none' }} ><button className='get-btn-link'>Get Started <FaLocationArrow size={20}/> </button></Link>
        </div>
        <div className='gt-cont-img'>
            <img 
                src='https://c0.cprnt.com/storage/i/71/18/d9/75/6aaf4a7da536b046d57e4930/19035973109bbf32fe996860da22bb7d.png'
                alt='' 
            />
        </div>
      </div>
      
    </div>
  )
}

export default GetStarted
