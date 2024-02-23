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

class TableList extends Component {
  


 
  render() {
 
    return (
        <div>Table list</div>
    );
  }
}

export default connect(
  (state) => ({

  }),
  {
 
  }
)(TableList);
