import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_TYPES_BY_CATEGORY,
  FILTER_PRODUCTS_BY_CATEGORY,
  ORDER_PRODUCTS_BY_PRICE,
  ADD_PRODUCT_REQUEST,
  EDIT_PRODUCT_REQUEST,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("http://localhost:8080/products");
  const data = await res.json();

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, type, category) => (dispatch) => {

  dispatch({
    type: FILTER_PRODUCTS_BY_TYPE,
    payload: {
      type: type,
      items: ((type === ""  && category === "") ? products : products.filter((x) =>  {
        
        console.log("am here type = ", type," categ = ", category);

        const conditionOne = x.typeId     === +type;
        const conditionTwo = x.categoryId === +category;

  
        //console.log(x.title)
      
        if(type === "") return conditionTwo;

        if(category === "" || category === undefined ) {
          console.log("condition one category nothing");
          return conditionOne;
        }
        

        if (conditionOne && conditionTwo) {
          
    
          console.log(category)
          console.log(x.categoryId)
          return conditionTwo;
        }

        // console.log( x.typeId ===  +type && x.categoryId === +category)

        // return x.typeId ===  +type;
      })),
    },
  });
};

export const filterProductsByCategory = (products, category) => (dispatch) => {
 

  dispatch({
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: {
      category: category,
      //items: (category === "") ? products : products.filter((x) => x.categoryId === +category)
    }
  })
}

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();

  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }

  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

export const filterTypes = (types, category) => (dispatch) => {
  
   dispatch({
    type: FILTER_TYPES_BY_CATEGORY,
    payload: {
      category: category,
      //items: (category === "" ? types : types.filter((x => x.categoryId === +category)))
    }
   })
}

export const addProductRequest = (token) => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_REQUEST
  })
}

export const addProduct = (token, formData) => async (dispatch) => {
  dispatch(addProductRequest());

  const res = await fetch("http://localhost:8080/admin/products", {
    method: "POST",
    headers: {
      Authorization  : `Bearer ${token}`
    },
    body: formData,
  });
  const data = await res.json();
  dispatch({
    type: ADD_PRODUCT,
    payload: {
      product: data.product
    }
  })
  

  console.log("add product");
}

export const editProductRequest = (token) => (dispatch) => {
  dispatch({
    type: EDIT_PRODUCT_REQUEST
  })
}

export const editProduct =  (token, formData, id) => async (dispatch) => {
  dispatch(editProductRequest());


  const res = await fetch(`http://localhost:8080/admin/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization  : `Bearer ${token}`
    },
    body: formData,
  });
  const data = await res.json();
  dispatch({
    type: EDIT_PRODUCT,
    payload: {
      product: data.product
    }
  })

  console.log("edit product");
}

export const deleteProductRequest = (token) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_REQUEST
  })
}

export const deleteProduct = (token, productId) => async(dispatch) => {
  const res = await fetch(`http://localhost:8080/admin/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({
    type: DELETE_PRODUCT,
    payload: {
      product: productId
    }
  })
}