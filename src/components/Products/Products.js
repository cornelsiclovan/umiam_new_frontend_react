import React, { Component } from "react";
import formatCurrency from "../../util/util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { Zoom } from "react-reveal";
import { fetchProducts } from "../../actions/productActions";
import { addToCart, getCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import { getCategories, getTypes } from "../../actions/ownerActions";

import "./Products.css";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      pastravWeight: 1,
      somonWeight: 1,
    };
  }

  componentDidMount() {
    const placeId = window.location.href.split("/")[4];

    this.props.fetchProducts(placeId);
    this.props.getCategories(this.props.token);
    this.props.getTypes(this.props.token, placeId);
  }

  openModal = (product) => {
    console.log(product);
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;

    console.log(window.location.href.split("/")[5]);
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul>
          <li>
            <Link
              style={{ fontSize: "20px" }}
              to="../places/1/1"
              onClick={() => {
                window.location.href = "../1/1";
              }}
            >
              Masa 1
            </Link>
          </li>
          <li>
            <Link
              style={{ fontSize: "20px" }}
              to="../places/1/2"
              onClick={() => {
                window.location.href = "../1/2";
              }}
            >
              Masa 2
            </Link>
          </li>
          <li>
            <Link
              style={{ fontSize: "20px" }}
              to="../places/1/4"
              onClick={() => {
                window.location.href = "../1/3";
              }}
            >
              Masa 3
            </Link>
          </li>
          <li>
            <Link
              style={{ fontSize: "20px" }}
              to="../places/1/3"
              onClick={() => {
                window.location.href = "../1/4";
              }}
            >
              Masa 4
            </Link>
          </li>
        </ul>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li
                  key={product.id}
                  style={{ height: "20rem", maxWidth: "15rem" }}
                >
                  <div className="product">
                    <a
                      href={"#" + product.id}
                      onClick={() => this.openModal(product)}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        style={{ maxHeight: "10rem", maxHeight: "10rem" }}
                        src={`http://localhost:8080/${product.imageUrl}`}
                        alt={product.title}
                      />
                      <p>
                        <b>{product.title}</b>{" "}
                        {product.price && formatCurrency(+product.price)}
                      </p>
                    </a>
                    {product.title === "Pastrav" && (
                      <input
                        type="number"
                        value={this.state.pastravWeight}
                        onChange={(event) =>
                          this.setState({ pastravWeight: event.target.value })
                        }
                      />
                    )}
                    {product.title === "Somon" && (
                      <input
                        type="number"
                        value={this.state.somonWeight}
                        onChange={(event) =>
                          this.setState({ somonWeight: event.target.value })
                        }
                      />
                    )}
                    <div className="product-price">
                      <button
                        onClick={() => {
                          if (product.title === "Pastrav") {
                            this.props.addToCart(
                              product,
                              this.props.token,
                              window.location.href.split("/")[5],
                              this.state.pastravWeight
                            );
                          } else if (product.title === "Somon") {
                            this.props.addToCart(
                              product,
                              this.props.token,
                              window.location.href.split("/")[5],
                              this.state.somonWeight
                            );
                          } else {
                            this.props.addToCart(
                              product,
                              this.props.token,
                              window.location.href.split("/")[5],
                              1
                            );
                          }
                        }}
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
                <img
                  src={`http://localhost:8080/${product.imageUrl}`}
                  alt={product.title}
                ></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>

                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button button-primary"
                      onClick={() => {
                        this.props.addToCart(
                          product,
                          this.props.token,
                          window.location.href.split("/")[5]
                        );
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
    getTypes,
    getCart,
  }
)(Products);
