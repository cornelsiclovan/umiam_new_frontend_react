import React, { Component, Fragment } from "react";
import { connect } from "react-redux";



import "./Places.css";
import OrderList from "../../components/Orders/OrderList";

class Orders extends Component {
 
 

  render() {
    return (
      <OrderList />
    );
  }
}

export default connect(
  (state) => ({

  }),
  {

  }
)(Orders);
