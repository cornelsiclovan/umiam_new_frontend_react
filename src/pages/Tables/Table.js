import React, { Component, Fragment } from "react";
import { connect } from "react-redux";



import "./Places.css";
import TableList from "../../components/Tables/TableList";

class Tables extends Component {
 
 

  render() {
    return (
      <TableList />
    );
  }
}

export default connect(
  (state) => ({

  }),
  {

  }
)(Tables);
