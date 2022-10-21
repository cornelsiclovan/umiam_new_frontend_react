import React, { Component } from "react";
import formatCurrency from "../../util/util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { Zoom } from "react-reveal";
import { fetchProducts } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import {getCategories, getTypes} from "../../actions/ownerActions";

import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    const placeId = window.location.href.split("/")[4];
   
    this.props.fetchProducts(placeId);
    this.props.getCategories(this.props.token);
    this.props.getTypes(this.props.token, placeId)
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product.id}>
                  <div className="product">
                    <a
                      href={"#" + product.id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.imageUrl} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        onClick={() =>
                          this.props.addToCart(product, this.props.token)
                        }
                        className="button button-primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizez:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button button-primary"
                      onClick={() => {
                        this.props.addToCart(product, this.props.token);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.filteredItems,
    token: state.auth.token,
  }),
  {
    fetchProducts,
    addToCart,
    getCategories,
    getTypes
  }
)(Products);
