import React, { Component } from "react";
import { connect } from "react-redux";
import { sortProducts, filterProducts, filterTypes, filterProductsByCategory } from "../../actions/productActions";

import "./Filter.css";

class Filter extends Component {
  render() {

    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>

        {this.props.categories  && (
          <div className="filter-size">
            Categories{" "}
            <select
              value={this.props.size}
              onChange={(e) =>{
                
                this.props.filterTypes(this.props.types, e.target.value);
                this.props.filterProductsByCategory(this.props.products, e.target.value);
              }}
            >
              <option value="">All</option>
              {this.props.categories &&
                this.props.categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}
              {/* <option value="2">pizza</option>
                            <option value="4">hamburger</option> */}
            </select>
          </div>
        )}

        {(this.props.types || this.props.filteredTypes) && (
          <div className="filter-size">
            Types(by categ.){" "}
            <select
              value={this.props.size}
              onChange={(e) =>
                    {
                      
                        this.props.filterProducts(this.props.products, e.target.value, this.props.categoryIdFromProducts)
                    }
                }
            >
              <option value="">All</option>
              {this.props.filteredTypes &&
                this.props.filteredTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.title}</option>
                ))}
              {/* <option value="2">pizza</option>
                                    <option value="4">hamburger</option> */}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    types: state.types.types,
    filteredTypes: state.types.filteredTypes,
    categories: state.categories.categories,
    categoryId: state.types.category,
    categoryIdFromProducts: state.products.category
  }),
  {
    filterProducts,
    sortProducts,
    filterTypes,
    filterProductsByCategory
  }
)(Filter);
