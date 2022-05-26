// 1. crear la propiedad en el objeto actions
// 2. creamos el case en el reducer por la propiedad que creamos en el paso 1
// 3. crear la función en el archivo actions
// 4. despachar la funcion en un componente o thunk
import axios from "axios";

export const actions = {
  setProducts: "SET_PRODUCTS",
  setIsLoading: "SET_IS_LOADING",
  setCategories: "SET_CATEGORIES",
  setCartList: "SET_CART_LIST",
};

// Para acceder al toke del local storge para validar la URl potegida
const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const setProducts = (product) => ({
  type: actions.setProducts,
  payload: product,
});

export const setIsLoading = (boolean) => ({
  type: actions.setIsLoading,
  payload: boolean,
});

export const setCategories = (category) => ({
  type: actions.setCategories,
  payload: category,
});

export const setCartList = (product) => ({
  type: actions.setCartList,
  payload: product,
});

export const getProductsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCategoriesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => dispatch(setCategories(res.data.data.categories)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterCategoriesThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
      )
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterHeadlineThunk = (headline) => {
  //console.log(headline)
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${headline}`
      )
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const loginThunK = (credentials) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        `https://ecommerce-api-react.herokuapp.com/api/v1/users/login`,
        credentials
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const addToCartThunk = (cart) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        `https://ecommerce-api-react.herokuapp.com/api/v1/cart`,
        cart,
        getConfig()
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCartListThunk = () => {
  return (dispatch) => {
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => dispatch(setCartList(res.data.data.cart.products)))
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("El carrito esta vacio");
        }
      });
  };
};

export const deleteCartListThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .delete(
        `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,
        getConfig()
      )
      .then(() => dispatch(getCartListThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
