import { Component } from "react";
import { connect } from "react-redux";
import { email, required } from "../../util/validators";
import { changePassword } from "../../actions/authActions";
import Auth from "./Auth";
import Input from "../../components/Form/Input";
import Button from "../../components/Button/Button";
import { Navigate } from "react-router-dom";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recoveryForm: {
        password: {
          value: "",
          valid: false,
          touched: false,
          validators: [required],
        },
        repeatPassword: {
          value: "",
          valid: false,
          touched: false,
          validators: [required],
        },
      },
      formIsValid: false,
      redirect: false,
      userId: null,
      status: null,
      token: null
    };
  }

  componentDidMount() {
    this.state.token = window.location.href.split("/")[4];
  }

  inputChangeHandler = (input, value) => {
    console.log(this.props); 
    this.setState((prevState) => {
      let isValid = true;

      for (const validator of prevState.recoveryForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.recoveryForm,
        [input]: {
          ...prevState.recoveryForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        recoveryForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        recoveryForm: {
          ...prevState.recoveryForm,
          [input]: {
            ...prevState.recoveryForm[input],
            touched: true,
          },
        },
      };
    });
  };

  changePassword = (e) => {
    e.preventDefault();

    console.log(this.state.token);

    this.props.changePassword({
      passwordToken: this.state.token,
      password: this.state.recoveryForm["password"].value,
      repeatPassword: this.state.recoveryForm["repeatPassword"].value,
    });
  };

  render() {

    console.log(this.props.redirect, this.props.status)

    if(this.props.redirect === true && this.props.status === 200) {
        return <Navigate to='/' replace={true} />
      }

    return (
      <Auth>
        <form onSubmit={this.changePassword}>
          <Input
            id="password"
            label="New password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "password")}
            value={this.state.recoveryForm["password"].value}
            valid={this.state.recoveryForm["password"].valid}
            touched={this.state.recoveryForm["password"].touched}
          />

          <Input
            id="repeatPassword"
            label="Repeat new password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "repeatPassword")}
            value={this.state.recoveryForm["repeatPassword"].value}
            valid={this.state.recoveryForm["repeatPassword"].valid}
            touched={this.state.recoveryForm["repeatPassword"].touched}
          />

          <div className="button-login-group">
            <Button design="raised" type="submit" loading={this.props.loading}>
              RESET PASSWORD
            </Button>
          </div>
        </form>
      </Auth>
    );
  }
}

export default connect((state) => ({
    redirect: state.auth.redirect,
    status: state.auth.status
}), {
  changePassword,
})(ChangePassword);
