import React, { Component } from "react";
import formatCurrency from "../../util/util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { Zoom } from "react-reveal";
import { fetchProducts } from "../../actions/productActions";
import { addToCart, getCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import { getCategories, getTypes } from "../../actions/ownerActions";
import { getPlace } from "../../actions/ownerActions";

import "./Products.css";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      pastravWeight: 1,
      somonWeight: 1,
      tableClicked: 1
    };
  }

  componentDidMount() {
    const placeId = window.location.href.split("/")[4];

    this.props.fetchProducts(placeId);
    this.props.getCategories(this.props.token);
    this.props.getTypes(this.props.token, placeId);
    this.props.getPlace(this.props.token, placeId);
    
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
    const { place } = this.props;

    let tableNumberArray = [];

    if (place && place.tableNumber > 0) {
      for (let i = 0; i < place.tableNumber; i++) {
        tableNumberArray.push(i + 1);
      }
    }

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul style={{ listStyle: "none", columnCount: "3"}}>
          {tableNumberArray &&
            tableNumberArray.map((number) => (
              <li>
                {this.state.tableClicked === number && <button
                  style={{ fontSize: "20px", padding: "5px", backgroundColor: "#fab83f", minWidth: "45px", marginBottom: "3px", flexWrap: "wrap"}}
                  
                  
                  onClick={() => {
                    this.props.getCart(this.props.token, number);
                    window.location.href =`#${number}`;
                  }}
                  // onClick={() => {
                  //   window.location.href = `../1/${number}`;
                  // }}
                >
                  {number}
                </button>}
                {this.state.tableClicked !== number && <button
                  style={{ fontSize: "20px", padding: "5px", maxWidth: "45px", minWidth: "45px", marginBottom: "3px"}}
                  
                  
                  onClick={() => {
                    this.props.getCart(this.props.token, number);
                    this.setState({...this.state, tableClicked: number})
                    window.location.href =`#${number}`;
                  }}
                  // onClick={() => {
                  //   window.location.href = `../1/${number}`;
                  // }}
                >
                  {number}
                </button>}
              </li>
            ))}
        </ul>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li
                  key={product.id}
                  style={{
                    height: "20rem",
                    maxWidth: "10rem",
                    display: "flex",
                  }}
                >
                  <div className="product">
                    
                      <img
                        style={{ maxHeight: "5rem" }}
                        src={`http://localhost:8080/${product.imageUrl}`}
                        alt={product.title}
                      />
                      <p>
                        <b>{product.title}</b>{" "}
                        {product.price && formatCurrency(+product.price)}
                      </p>
                   
                    {product.title === "Pastrav" && (
                      <input
                        type="number"
                        style={{ width: "100px", height: "10px" }}
                        value={this.state.pastravWeight}
                        onChange={(event) =>
                          this.setState({ pastravWeight: event.target.value })
                        }
                      />
                    )}
                    {product.title === "Somon" && (
                      <input
                        type="number"
                        style={{ width: "100px", height: "10px" }}
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
                              this.state.tableClicked,
                              this.state.pastravWeight
                            );
                          } else if (product.title === "Somon") {
                            this.props.addToCart(
                              product,
                              this.props.token,
                              this.state.tableClicked,
                              this.state.somonWeight
                            );
                          } else {
                            this.props.addToCart(
                              product,
                              this.props.token,
                              this.state.tableClicked,
                              1
                            );
                          }
                        }}
                        className="button button-primary"
                      >
                        Add
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
    place: state.places.place,
  }),
  {
    fetchProducts,
    addToCart,
    getCategories,
    getTypes,
    getCart,
    getPlace,
  }
)(Products);
