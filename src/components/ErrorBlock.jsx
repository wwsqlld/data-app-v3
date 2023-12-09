import React from 'react';
import { BiSolidError } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";

const ErrorBlock = (props) => {

    const propsT = props.title;
    const propsB = props.boolen;


  return (
    <>
    {propsB ? (
        <div className="error-cont">        
            <FcCheckmark size={24} />
            <p>{propsT}</p>
        </div> 
    ) : (
        <div className="error-cont">        
            <BiSolidError size={24} style={{ color: 'red' }}/>
            <p>{propsT}</p>
        </div>     
    )}
    </>
    
  )
}

export default ErrorBlock
