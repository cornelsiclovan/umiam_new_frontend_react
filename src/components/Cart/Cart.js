import React, { Component } from "react";
import formatCurrency from "../../util/util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart, getCart } from "../../actions/cartActions";
import { createOrder, clearOrder } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";
import Modal from 'react-modal'

import './Cart.css';
import { Zoom } from "react-reveal";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  componentDidMount = () => {
    this.props.getCart(this.props.token);
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.cartItem.quantity, 0)
      // name: this.state.name,
      // email: this.state.email,
      // address: this.state.address,
      // cartItems: this.props.cartItems,
    };

    this.props.createOrder(order, this.props.token);
  };

  closeModal = () => {
    this.props.clearOrder();
    this.props.clearCart();
    this.state.showCheckout = false;
    
  }

  render() {
    const { cartItems, order } = this.props;

    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (        
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

          {
            order && 
              <Modal
                isOpen = {true}
                onRequestClose={this.closeModal}
              >
                <Zoom>
                  <button className="close-modal" onClick={this.closeModal}>
                    x
                  </button>
                  <div className="order-details">
                    <h3 className="success-message">
                      Your order has been placed
                    </h3>
                    <h2>
                      Order {order.order.id}
                    </h2>
                    <ul>
                      <li>
                        <div>Name:</div>
                        <div>{order.user.name}</div>
                      </li>
                      <li>
                        <div>Email:</div>
                        <div>{order.user.email}</div>
                      </li>
                      <li>
                        <div>Date:</div>
                        <div>{order.order.createdAt}</div>
                      </li>
                      <li>
                        <div>Total:</div>
                        <div>{formatCurrency(order.order.total)}</div>
                      </li>
                      <li>
                        <div>Cart items:</div>
                        <div className="items">
                          {cartItems.map(x => (
                            <div>{x.cartItem.quantity} { " x " } { x.title }</div>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Zoom>
              </Modal> 
          }

        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <img src={item.imageUrl} alt={item.title}></img>
                    </div>
                    <div>{item.title}</div>
                    <div className="right">
                      <div>
                        {formatCurrency(item.price)} x {item.cartItem.quantity}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item, this.props.token)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      
                      cartItems.reduce((a, c) => a + c.price * c.cartItem.quantity, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button button-primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <button
                            className="button button-primary"
                            type="sumbit"
                          >
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
    token: state.auth.token
  }),
  {
    removeFromCart,
    createOrder,
    clearOrder,
    getCart,
    clearCart
  }
)(Cart);
