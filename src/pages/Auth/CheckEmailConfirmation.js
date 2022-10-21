import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {autoRedirect} from "./../../actions/authActions";

class CheckEmailConfirmation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setAutoRedirect();
  }

  setAutoRedirect = () => {
    setTimeout(() => {this.props.autoRedirect()}, 100);
  }


  render() {
    return (
      <h2 style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}>
       
        Please visit your email to change password for your account. After
        changing your password please&nbsp;<Link to="/"> login</Link>
      </h2>
    );
  }
}

export default connect((state) => ({}), {
    autoRedirect
})(CheckEmailConfirmation);
