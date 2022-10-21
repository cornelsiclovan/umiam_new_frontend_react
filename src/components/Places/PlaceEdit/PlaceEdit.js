import React, { Component, Fragment } from "react";
import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";
import Input from "../../Form/Input";
import { required, length } from "../../../util/validators";
import { addPlace, editPlace } from "../../../actions/ownerActions";
import { connect } from "react-redux";


const PLACE_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  description: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  location: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  tableNumber: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  }
};

class PlaceEdit extends Component {
    state = {
        placeForm: PLACE_FORM,
        formIsValid: false,
    }

    componentDidUpdate(prevProps, prevState) {
      
        if(
            this.props.editing &&
            prevProps.editing !== this.props.editing &&
            prevProps.selectedPlace !== this.props.selectedPlace
        ) {
            const placeForm = {
                title: {
                    ...prevState.placeForm.title,
                    value: this.props.selectedPlace.title,
                    valid: true
                },
                description: {
                    ...prevState.placeForm.description,
                    value: this.props.selectedPlace.description,
                    valid: true
                },
                location: {
                    ...prevState.placeForm.location,
                    value: this.props.selectedPlace.location,
                    valid: true
                },
                tableNumber: {
                    ...prevState.placeForm.tableNumber,
                    value: this.props.selectedPlace.tableNumber,
                    valid: true
                }
            }
            this.setState({placeForm: placeForm, formIsValid: true})
        }
    }

    placeInputChangeHandler = (input, value) => {
        this.setState(prevState => {
            let isValid = true;
            for(const validator of prevState.placeForm[input].validators) {
                isValid = isValid && validator(value);
            }
            const updatedForm = {
                ...prevState.placeForm,
                [input]: {
                    ...prevState.placeForm[input],
                    valid: isValid,
                    value: value
                }
            };
            let formIsValid = true;
            for(const inputName in updatedForm) {
                formIsValid = formIsValid && updatedForm[inputName].valid;
            }

            return {
                placeForm: updatedForm,
                formIsValid: formIsValid
            }
        })
    }

    inputBlurHandler = input => {
        this.setState(prevState => {
            return {
                placeForm: {
                    ...prevState.placeForm,
                    [input]: {
                        ...prevState.placeForm[input],
                        touched: true
                    }
                }
            }
        })
    }

    cancelPlaceChangeHandler = () => {
        this.setState({
            placeForm: PLACE_FORM,
            formIsValid: false
        });
        this.props.onCancelEdit();
    }

    acceptPlaceChangeHandler = () => {
    
        const place = {
            title: this.state.placeForm.title.value,
            description: this.state.placeForm.description.value,
            location: this.state.placeForm.location.value,
            tableNumber: this.state.placeForm.tableNumber.value
        }

        this.props.onFinishEdit(place);
    }

    render () {
        const formTitle = this.props.selectedPlace ? "Edit place" : "New Place";

        return this.props.editing ? (
            <Fragment>
                <Backdrop onClick={this.cancelPlaceChangeHandler} />    
                <Modal 
                    title={ formTitle }
                    acceptEnabled={this.state.formIsValid}
                    onCancelModal={this.cancelPlaceChangeHandler}
                    onAcceptModal={this.acceptPlaceChangeHandler}
                    isLoading={this.props.loading}
                >
                    <form>
                        <Input
                            id="title"
                            label="Title"
                            control="input"
                            onChange={this.placeInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'title')}
                            valid={this.state.placeForm['title'].valid}
                            touched={this.state.placeForm['title'].touched}
                            value={this.state.placeForm['title'].value}
                        />
                        <Input
                            id="description"
                            label="Description"
                            control="input"
                            onChange={this.placeInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'description')}
                            valid={this.state.placeForm['description'].valid}
                            touched={this.state.placeForm['description'].touched}
                            value={this.state.placeForm['description'].value}
                        />
                        <Input 
                            id="location"
                            label="Location"
                            control="input"
                            onChange={this.placeInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'location')}
                            valid={this.state.placeForm['location'].valid}
                            touched={this.state.placeForm['location'].touched}
                            value={this.state.placeForm['location'].value}
                        />
                        <Input 
                            id="tableNumber"
                            label="Number of tables"
                            control="input"
                            onChange={this.placeInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'tableNumber')}
                            valid={this.state.placeForm['tableNumber'].valid}
                            touched={this.state.placeForm['tableNumber'].touched}
                            value={this.state.placeForm['tableNumber'].value}
                        />
                    </form>
                </Modal>
            </Fragment>
        ) : null;
    }
}

export default connect(
    (state) => ({
      token: state.auth.token,
      places: state.places.placeList,
      isFetching: state.places.isFetching,
    }),
    {
      addPlace,
      editPlace
    }
  )(PlaceEdit);

