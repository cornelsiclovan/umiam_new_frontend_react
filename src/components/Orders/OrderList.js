import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";

import "./Products.css";

class OrderList extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.token);
  }
  

  render() {
    const { orders, orderTotals } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>data si ora</th> <th>total</th>
          </tr>
        </thead>
        {orders &&
          orderTotals.map((order) => {
            
            return (
              <tr>
                {" "}
                <td>{order.data}</td> <td>{order.total}</td> 
              </tr>
            );
          })}
      </table>
    );
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    orders: state.order.orders,
    orderTotals: state.order.orderTotals
  }),
  {
    getOrders,
  }
)(OrderList);
