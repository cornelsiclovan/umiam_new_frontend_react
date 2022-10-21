import React, {Component} from 'react';
import Input from '../../components/Form/Input';
import Auth from '../Auth/Auth';
import { connect } from "react-redux";
import { required, length, email } from "../../util/validators";
import Button from "../../components/Button/Button";
import {userConfirm, autoRedirect} from "../../actions/authActions";
import { Navigate } from 'react-router-dom';

class TokenRegistryConfirmation extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            signupForm: {
                token: {
                value: "",
                valid: false,
                touched: false,
                validators: [required],
                }
                
            },
            formIsValid: false,
            redirect: false,
            userId: null,
            status: null
            };
    }
    
    componentDidMount = () => {
      
    }
    
    inputBlurHandler = (input) => {
        this.setState(prevState => {
            return {
                signupForm: {
                    ...prevState.signupForm,
                    [input]: {
                        ...prevState.signupForm[input],
                        touched: true
                    }
                }
            }
        })
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
    }


    confirmToken = (e) => {
        e.preventDefault();
    
        this.props.userConfirm({
            registryToken: this.state.signupForm['token'].value
        }) 
    }

    render() {
       
        if(this.props.redirect === null  && this.props.status === 200) {
            return <Navigate to='/' replace={true} />
        }
    
        // else
        return (
            <Auth>
            <form onSubmit={this.confirmToken}>
                <Input
                    id="token"
                    label="Registry token"
                    type="text"
                    control="input"
                    onChange={this.inputChangeHandler}
                    onBlur={this.inputBlurHandler.bind(this, "token")}
                    value={this.state.signupForm["token"].value}
                    valid={this.state.signupForm["token"].valid}
                    touched={this.state.signupForm["token"].touched}
                />
             
    
                <Button design="raised" type="submit" loading={this.props.loading}>
                Confirm registration token
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
      status: state.auth.confirmAccountStatus,
      redirect: state.auth.redirect
    }),
    {
      userConfirm,
      autoRedirect
    }
  )(TokenRegistryConfirmation);
  