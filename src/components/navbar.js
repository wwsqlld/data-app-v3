import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import { CgDatabase } from "react-icons/cg";
import {useCookies} from 'react-cookie';
import { BsList } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { VscTriangleUp } from "react-icons/vsc";

import { CSSTransition } from 'react-transition-group';



function Navbar() {

    const [cookies] = useCookies(["access_token"]);

    const [openMenu, setOpenMenu] = useState(false);
    const [closeButt, setCloseButt] = useState(false);

    const nodeRef = useRef(null);

    const changeVar = () => {
        setOpenMenu(!openMenu)
        setCloseButt(!closeButt)
    }

    const changeVatButt = () => {
        setOpenMenu(false)
        setCloseButt(false)
    }

    



  return (
    <div className='navbar'>
        <div className='logo-cont'>
            
            <CgDatabase size="50px" color='black' style={{ marginLeft: '10px' }} onClick={(e) => window.location.reload()} />
            <p id='logo-txt'>DATABASE</p>
        </div>
        <div className='nav-cont'>
            <NavLink to="/" className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Data Board</p>) : (<p>Home</p>)}
                <VscTriangleUp className='nav-curs-path' width={40} height={40}/>
            </NavLink>
            <NavLink to="/create" className='nav-btn' style={{ textDecoration: 'none'}} >
                <p>Create Data</p>
                <VscTriangleUp className='nav-curs-path' width={40} height={40}/>
            </NavLink>
            <NavLink to="/auth" className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Account</p>) : (<p>Sign In</p>)}
                <VscTriangleUp className='nav-curs-path' width={30} height={30}/>
            </NavLink>
            {closeButt ? (
                <MdOutlineClose id='closeButton' onClick={() => changeVar()}/>
            ) : (
                <BsList id='listOpButton' onClick={() => setOpenMenu(!openMenu)}/>
            )}
            
        </div>
        <CSSTransition 
        in={openMenu}
        nodeRef={nodeRef}
        timeout={300}
        classNames="nav-open-menu"
        unmountOnExit
        // onEnter={() => setShowButton(false)}
        // onExited={() => setShowButton(true)}
        >
           <div className='nav-open-menu'>
                <Link to="/" className='nav-btn-menu' style={{ textDecoration: 'none'}} onClick={() => changeVatButt()} ><p>Home</p></Link>
                <Link to="/create" className='nav-btn-menu' style={{ textDecoration: 'none'}} onClick={() => changeVatButt()}><p>Create Data</p></Link>
                <Link to="/auth" className='nav-btn-menu' style={{ textDecoration: 'none'}} onClick={() => changeVatButt()} >
                    {cookies.access_token ? (<p>Account</p>) : (<p>Sign In</p>)}
                </Link>          
            </div> 
            
        </CSSTransition>
                
        
        

    </div>
  )
}

export default Navbar