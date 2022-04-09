//import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartListThunk } from '../../redux/actions';
import CartList from '../cartList/CartList';
import Login from '../login/Login';
import './navbar.css'

const NavBar = () => {

    const dispacth = useDispatch()
   
    const [isLoginOpen, setLoginOpen] = useState(false)
    const [isCartListOpen, setIsCartListOpen] = useState (false)

    const openCartList = () => {
        setIsCartListOpen(!isCartListOpen)
        dispacth( getCartListThunk())

    }


    return (
        <header >
            <div className='navbar'>
                <nav className='navbar-menu'>
                    <div className='navbar-title'>
                        <Link to='/'>
                            <strong>e-commerce</strong>
                        </Link>
                    </div>
                
                    <button onClick={() =>setLoginOpen(!isLoginOpen)}>
                        <i className="fa-solid fa-user"></i>
                    </button>
                    
                    <button>
                        <Link to='/purchases' className='link-purchase'>
                            <i className="fa-solid fa-box-archive"></i>
                        </Link>
                    </button>
                
                    {/* Este boton abre el modal de cartList y ejecuta el Thunk */}
                    <button
                        onClick={openCartList}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </nav>                
                
                <Login 
                    isLoginOpen= {isLoginOpen}
                    setLoginOpen = {setLoginOpen}
                />

                <CartList
                    isCartListOpen = {isCartListOpen}
                />
            </div>
        </header>
    );
};

export default NavBar;