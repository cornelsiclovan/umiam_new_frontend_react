import React, { Component } from "react";
import Input from "../../components/Form/Input";
import { signup } from "../../actions/authActions";
import { required, length, email } from "../../util/validators";
import { connect } from "react-redux";
import Auth from "./Auth";
import Button from "../../components/Button/Button";
import {withRouter} from "../../util/withrouter";
import {Navigate} from "react-router-dom";
import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";

class Signup extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      signupForm: {
        name: {
          value: "",
          valid: false,
          touched: false,
          validators: [required],
        },
        email: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, email],
        },
        password: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({min: 5})],
        },
        repeatPassword: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({min: 5})],
        },
      },
      formIsValid: false,
      userId: null,
      status: null
    };
  }

  componentDidMount() {
    
  }

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };

  signup = (e) => {
    
    e.preventDefault();
    const user = {
      name: this.state.signupForm['name'].value,
      email: this.state.signupForm['email'].value,
      password: this.state.signupForm['password'].value,
      repeatPassword: this.state.signupForm['repeatPassword'].value
    };
   
      this.props.signup(user)   
  };

  render() {
   

    if(this.props.redirect === true) {
      return <Navigate to='/confirmRegistrationToken' replace={true} />
    }

    else
    return (
      <Auth>
        <form onSubmit={this.signup}>
          <Input
            id="name"
            label="Your name"
            type="name"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "name")}
            value={this.state.signupForm["name"].value}
            valid={this.state.signupForm["name"].valid}
            touched={this.state.signupForm["name"].touched}
          />
          <Input
            id="email"
            label="Your email"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "email")}
            value={this.state.signupForm["email"].value}
            valid={this.state.signupForm["email"].valid}
            touched={this.state.signupForm["email"].touched}
          />

          <Input
            id="password"
            label="Your password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "password")}
            value={this.state.signupForm["password"].value}
            valid={this.state.signupForm["password"].valid}
            touched={this.state.signupForm["password"].touched}
          />

          <Input
            id="repeatPassword"
            label="Repeat password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "repeatPassword")}
            value={this.state.signupForm["repeatPassword"].value}
            valid={this.state.signupForm["repeatPassword"].valid}
            touched={this.state.signupForm["repeatPassword"].touched}
          />

          <Button design="raised" type="submit" loading={this.props.loading}>
            Signup
          </Button>
        </form>
      </Auth>
      
    );
   
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
    expiryDate: state.auth.expiryDate,
    loading: state.auth.loading,
    status: state.auth.status,
    redirect: state.auth.redirect
  }),
  {
    signup,
  }
)(Signup);
