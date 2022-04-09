import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { filterCategoriesThunk } from '../../redux/actions';
import './filterCategory.css'

const FilterCategory = ({isOpenCategory,setIsOpenCategory}) => {
    
    
    const categories = useSelector((state) => state.categories)
    const dispacht = useDispatch()


    const filterPreci = (e) =>{
        e.preventDefault();
        console.log("me hice submit")
    }


    return (
        <aside className={`category-modal ${isOpenCategory ? "category-open" : " "} `}>
            <button
                className='btn-close'
                onClick={()=> setIsOpenCategory(!isOpenCategory)}
            >
               <i className="fa-solid fa-xmark"></i>
            </button>
            <h4>Filters</h4>
           
            <div className='filter-preci'>
                <div className='title-filter-category'>
                    <h5>Preci</h5>
                    <button>
                        <i className="fa-solid fa-angle-down"></i>  
                    </button>
                </div>

                <form action="" className='filter-form-input'>
                    <div className="input-conteiner">
                        <label htmlFor="from">From</label>
                        <input 
                            type="number"
                            id='from'
                            name='from' 
                        />
                        
                    </div>
                    <div className="input-conteiner">
                        <label htmlFor="to">To</label>
                        <input 
                            type="number"
                            id='to'
                            name='to' 
                        />
                    </div>
                    <button
                        className='btn-filter-preci'
                        onClick={filterPreci}
                    >
                        Filter Price
                    </button>
                </form>
            </div>
            
            <div className='filter-category'>
                <div className='title-filter-category'>
                    <h5>Category</h5>
                    <button>
                        <i className="fa-solid fa-angle-down"></i>
                    </button>
                </div>
                <div className='filter-category-items'>
                    {categories&&
                        categories.map(category =>  (
                        <button 
                                key={category.id}
                                onClick={()=> dispacht(filterCategoriesThunk(category.id))}
                            >
                            {category.name}
                        </button>
                        ))
                    }
                </div>
            </div>
        </aside>
    );
};

export default FilterCategory;