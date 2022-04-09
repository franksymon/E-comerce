import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  addToCartThunk, getProductsThunk, /*getCartListThunk*/ } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Product } from '../../components';
import './shop.css'

const Shop = () => {
   
    const {id} = useParams()
    
    const dispatch = useDispatch()
    useEffect(() => {dispatch(getProductsThunk())},[dispatch])
    const products = useSelector((state) => state.products) 
    
    //Para obtner un elemento del array productos segun el id que trae el useParams
    const productId = products.find(product => product.id === Number(id) ) 
    
    //Peteicon Para obtener los productos segun el id del la categoria
    const [productFilter, setProductFilter] = useState([])
    useEffect(() => {
        if(productId){
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productId?.category.id}`)
                .then(res => {
                    setProductFilter(res.data.data.products)
            })
        }
    },[productId])

    //Estado para controlar contador (botton) de productos
    const [quantity,setQuantity] = useState (1)
    
    // funcion para botton add Cart
    const AddToCart = () =>{
        const cart = {
            id: Number(id),// id de useParams
            quantity: quantity
        }
        //console.log(cart)
        dispatch(addToCartThunk(cart))
        //dispatch(getCartListThunk())
    }

   
    
    //localStorage.setItem("userName", "Frank")
    //console.log(localStorage.getItem("userName"))

    //console.log(productId)
    //console.log(productFilter)
    
    return (
        <section className='shop-detail'>
            
            <dir className="shop-ruta">
                <Link to='/'>
                    <p>Home</p>
                </Link>
                <div className='separator'> </div>
                <p>
                    <b>{productId?.title}</b>
                </p>
            </dir>
            
            <div className='shop-info'>
               <div className='shop-col-1'>
                    <button className='bth-slider-shop'>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <div className='img-slider'>
                            <div className='slider-conteiner'>
                                <div className='img-item'> 
                                    <img src={productId?.productImgs[2]} alt="" />
                                </div>
                            </div>
                    </div>
                    <button className='bth-slider-shop'>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
               </div>

               <div className='shop-col-2'>
                   <h3>{productId?.title}</h3>
                   
                   <div className='product-details'>
                        
                        <div className='shop-col-2-preci'>
                            <p>Price</p>
                            <h4>$ {productId?.price}</h4>
                        </div>

                        <div className='shop-col-2-quantity'>
                            <p>Quantity</p>
                            <div className='btn-quantity'>
                                <button 
                                    onClick={() => setQuantity(quantity - 1) }
                                    disabled={quantity === 1 }
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <span>{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1) }
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>

                   </div>
                   
                   <div className='btn-shop'>
                        <button 
                            onClick={AddToCart}
                        > 
                            Add to cart <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                   </div>

                   <p>{productId?.description}</p>
               </div>
            </div>
            
            <div className='components-product'>
               <div className='product-title'>
                   <h4>Discover similar items</h4>
               </div>

                <div className='item-container'>
                    {
                        productFilter?.map(productItem => (
                            <div 
                                key={productItem.id}
                                className='item-product'
                            >
                                <Product product={productItem}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </section>
    );
};

export default Shop;




/* <div className='img-slider'>
<div className='slider-container'>
    <div className='img-list' style={imgListStyles}>
        {
            productId?.productImgs.map(img => (
                <ul 
                    className='img-item'
                    style={{with: itenWith + "%"}}
                    key={img}
                > 
                    <img src={img} alt="" />
                </ul>
            ))
        }
    </div>
    <button onClick={()=> setSliderPosition(sliderPosition-1)}>Back</button>
    <button onClick={()=> setSliderPosition(sliderPosition+1)}>Next</button>
</div>
</div> */

/******* Slider-Image ********/
    // const [sliderPosition, setSliderPosition] = useState(1)

    // const itenWith = 100 / productId?.productImg?.length
    // const imgListStyles = {
    //     width: productId?.productImg?.length * 100 +"%",
    //     transform: `translateX(-${itenWith * (sliderPosition-1)}%)`
    // }
/******* Slider-Image-End ********/

         


