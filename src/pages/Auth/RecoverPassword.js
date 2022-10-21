import { Component } from "react";
import { connect } from "react-redux";
import { email, required } from "../../util/validators";
import { resetPassword } from "../../actions/authActions";
import Auth from "./Auth";
import Input from "../../components/Form/Input";
import Button from "../../components/Button/Button";
import { Navigate } from "react-router-dom";

class RecoverPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
        recoveryForm: {
            email: {
            value: "",
            valid: false,
            touched: false,
            validators: [required, email],
            },
        },
        formIsValid: false,
        redirect: false,
        userId: null,
        status: null
        };
    }

    componentDidMount() {
    
    }
  
    inputChangeHandler = (input, value) => {
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
  

    resetPassword = (e) => {
      e.preventDefault();

      this.props.resetPassword({
        email: this.state.recoveryForm['email'].value
      });
    }

    render() {

      if(this.props.status === 200 && this.props.redirect !== null) {
        return <Navigate to='/check-email-confirmation' replace={true} />
      }

      return(
        <Auth>
        <form onSubmit={this.resetPassword}>
          <Input
            id="email"
            label="Your email"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "email")}
            value={this.state.recoveryForm["email"].value}
            valid={this.state.recoveryForm["email"].valid}
            touched={this.state.recoveryForm["email"].touched}
          />

          <div className='button-login-group'>
            <Button design="raised" type="submit" loading={this.props.loading}>
                RESET PASSWORD
            </Button>
          </div>
        </form>
      </Auth>
      )
    }

}

export default connect( (state) => ({
    status: state.auth.status,
    redirect: state.auth.redirect
  }),
  {
    resetPassword,
  })(RecoverPassword);