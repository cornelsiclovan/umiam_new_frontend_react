import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";

import "./Products.css";

class OrderList extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.token);
  }

  render() {
    const { orders } = this.props;
    console.log(orders);

    return (
      <table>
        <thead>
          <tr>
            <th>Nr. crt.</th><th>data si ora</th> <th>total</th> <th>masa</th>
          </tr>
        </thead>
        {orders &&
          orders.map((order) => {
            return (
              <tr>
                {" "}
                <td>{order.id}</td><td>{order.createdAt}</td> <td>{order.total}</td> <td>{order.table_id}</td>
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
  }),
  {
    getOrders,
  }
)(OrderList);
