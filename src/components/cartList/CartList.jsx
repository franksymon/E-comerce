import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartListThunk, getCartListThunk } from '../../redux/actions';
import './cartList.css'

const CartList = ({isCartListOpen}) => {
    
    const cartList = useSelector(state => state.cartList)
    const dispacth = useDispatch()
    
    
    useEffect(()=>{
        dispacth(getCartListThunk)
    },[dispacth])
   
    //console.log(cartList)

    return (

        <>
            <div className={`cart-modal ${isCartListOpen ? "open" : " "} `}>
                <h3 className='cart-list-title'>Carrito de Compras</h3>
                <div className='cart-container'>
                    {
                    <ul >
                        {    cartList.map(product => (
                                    <li key={product.id} className='cart-list'>
                                        <div className='cart-list-content'> 
                                            <div className='cart-list-info'>
                                                <small>{product.brand}</small>
                                                <p className='cart-list-content-title'>{product.title}</p>
                                                <p className='quantity'>{product.productsInCart.quantity}</p>
                                            </div>
                                            <button
                                                onClick={()=> dispacth(deleteCartListThunk(product.productsInCart.productId)) }
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                        <p><span>Total: </span> <b> $ {Number(product.price) * product.productsInCart.quantity}</b></p>
                                    </li>

                                ))
                        }
                    </ul>
                    }
                </div>
                <div className='checkout'>
                    <div className='checkout-info'>
                        <small>Total:</small>
                        <p>$ 0000</p>
                    </div>
                    <button>Checkout</button>
                </div>
            </div>
        </>
    );
};

export default CartList;