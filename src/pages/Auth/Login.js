import React, {Component} from 'react';
import Input from '../../components/Form/Input';
import Auth from '../Auth/Auth';
import { connect } from "react-redux";
import { required, length, email } from "../../util/validators";
import Button from "../../components/Button/Button";
import { login, autoRedirect, logout } from "../../actions/authActions";
import { Link } from 'react-router-dom';

class Login extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
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
             
            },
            formIsValid: false,
            userId: null,
            status: null
          };
    }

    componentDidMount = () => {
      this.autoRedirect();
    }

    autoRedirect = () => {
      setTimeout(() => {
        this.props.autoRedirect()
      }, 100)
    }
    
    inputBlurHandler = (input) => {
        this.setState(prevState => {
            return {
                loginForm: {
                    ...prevState.loginForm,
                    [input]: {
                        ...prevState.loginForm[input],
                        touched: true
                    }
                }
            }
        })
    }

    inputChangeHandler = (input, value) => {
        this.setState((prevState) => {
            let isValid = true;
            
            for (const validator of prevState.loginForm[input].validators) {
                isValid = isValid && validator(value);
            }
            const updatedForm = {
                ...prevState.loginForm,
                [input]: {
                ...prevState.loginForm[input],
                valid: isValid,
                value: value,
                },
            };
            let formIsValid = true;
            for (const inputName in updatedForm) {
                formIsValid = formIsValid && updatedForm[inputName].valid;
            }
            return {
                loginForm: updatedForm,
                formIsValid: formIsValid,
            };
            });
    }

    login = (e) => {
        e.preventDefault();
        const user = {
          email: this.state.loginForm['email'].value,
          password: this.state.loginForm['password'].value,
        };
       
        this.props.login(user);
        const remainingMilliseonds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseonds);
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        

        this.setAutoLogout(remainingMilliseonds);
    }

    setAutoLogout = milliseconds => {
    
      setTimeout(() => {

        this.props.logout();
      }, milliseconds)
    }

    render() {
        return (
            <Auth>
            <form onSubmit={this.login}>
              <Input
                id="email"
                label="Your email"
                type="email"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, "email")}
                value={this.state.loginForm["email"].value}
                valid={this.state.loginForm["email"].valid}
                touched={this.state.loginForm["email"].touched}
              />
    
              <Input
                id="password"
                label="Your password"
                type="password"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, "password")}
                value={this.state.loginForm["password"].value}
                valid={this.state.loginForm["password"].valid}
                touched={this.state.loginForm["password"].touched}
              />
    
              <div className='button-login-group'>
                <Button design="raised" type="submit" loading={this.props.loading}>
                    Login
                </Button>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </form>
          </Auth>
        )
    }
}

export default connect(
    (state) => ({
      token: state.auth.token,
      userId: state.auth.userId,
      expiryDate: state.auth.expiryDate,
      loading: state.auth.loading,
      status: state.auth.confirmAccountStatus,
    }),
    {
      login,
      autoRedirect,
      logout
    }
  )(Login);
  