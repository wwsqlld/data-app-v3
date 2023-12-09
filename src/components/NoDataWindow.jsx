import React from 'react';
import { FcVlc } from "react-icons/fc";

const NoDataWindow = () => {
  return (
    <div className='ndw-main'>
      <FcVlc size={130}/>
      <p>First you need to log in to your account</p>
    </div>
  )
}

export default NoDataWindow
