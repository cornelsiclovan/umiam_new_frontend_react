import React, { Component } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import {
   getPlace,
   getCategories,
   getTypes
  } from "../../../../actions/ownerActions";
import {
  fetchProducts
} from "../../../../actions/productActions";

import Filter from "../../../../components/Filter/Filter";

import './Place.css';


class Place extends Component {
    componentDidMount() {
        const placeId = window.location.href.split("/")[5];
        this.props.getPlace(this.props.token, placeId);
        this.props.getCategories(this.props.token);
        this.props.getTypes(this.props.token, placeId);
        this.props.fetchProducts(this.props.token);
    }

    render() {
  
        return (
          <Fragment>
              {
                this.props.types &&
                <Filter />
              }  

              { 
                this.props.place &&
                  <div>{this.props.place.title}</div> 
              }
              
              {
                this.props.categories && 
                this.props.categories.map((category) => (
                 <div key={category.id}>{category.title}</div>  
                ))
              }

              {
                this.props.types && 
                this.props.types.map((type) => (
                 <div key={type.id}>{type.title}</div>  
                ))
              }

              {
                this.props.products && 
                this.props.products.map((type) => (
                 <div key={type.id}>{type.title}</div>  
                ))
              }

          </Fragment>
          
        );
    }
}

export default connect(
    (state) => ({
      token: state.auth.token,
      place: state.places.place,
      categories: state.categories.categories,
      types: state.types.types, 
      products: state.products.filteredItems
    }),
    {
      getPlace,
      getCategories,
      getTypes,
      fetchProducts
    }
  )(Place);
