import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_TYPE,
  FILTER_TYPES_BY_CATEGORY,
  FILTER_PRODUCTS_BY_CATEGORY,
  ORDER_PRODUCTS_BY_PRICE,
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
  console.log("filterProds", category);

  dispatch({
    type: FILTER_PRODUCTS_BY_TYPE,
    payload: {
      type: type,
      items: ((type === ""  && category === "") ? products : products.filter((x) =>  {
       

        const conditionOne = x.typeId     === +type;
        const conditionTwo = x.categoryId === +category;

        console.log("----------------------");
        console.log(x.title)
      
        if(type === "") return conditionTwo;
       

        if (conditionOne && conditionTwo) {
          console.log(!conditionOne);
          console.log("condition two");
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
      items: (category === "") ? products : products.filter((x) => x.categoryId === +category)
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
      items: (category === "" ? types : types.filter((x => x.categoryId === +category)))
    }
   })
}

