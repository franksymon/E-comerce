import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterHeadlineThunk,
  getCategoriesThunk,
  getProductsThunk,
} from "../../redux/actions";
import { Product } from "../../components";
import "./home.css";
import FilterCategory from "../../components/filterCategory/FilterCategory";

const Home = () => {
  const dispacht = useDispatch();

  //Estados glgobales Redux
  const products = useSelector((state) => state.products);

  //Estado Para abrir modal de Filter Category
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  // Para el input de busqueda en el From
  const [searchProduct, setSearchProduct] = useState("");

  //funcion submit para la busqueda de product
  const searchProductSubmit = (e) => {
    e.preventDefault();
    dispacht(filterHeadlineThunk(searchProduct));
  };

  useEffect(() => {
    dispacht(getProductsThunk());
    dispacht(getCategoriesThunk());
  }, [dispacht]);

  //console.log(searchProduct)
  //console.log(products)
  //console.log(categories)

  return (
    <section id="home">
      <FilterCategory
        isOpenCategory={isOpenCategory}
        setIsOpenCategory={setIsOpenCategory}
      />

      <section className="products-container">
        <div className="search-box">
          <form onSubmit={searchProductSubmit}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search Product"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <button onClick={() => setIsOpenCategory(!isOpenCategory)}>
            <i className="fa-solid fa-filter"></i>
            <span> Filter</span>
          </button>
        </div>

        <article className="box-card">
          {products.length === 0 ? (
            <p>Producto No Encontrado</p>
          ) : (
            products.map((product) => (
              <Product product={product} key={product.id} />
            ))
          )}
        </article>
      </section>
    </section>
  );
};

export default Home;
