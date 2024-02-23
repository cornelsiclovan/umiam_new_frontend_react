import { Component, Fragment } from "react";
import { required, length } from "../../util/validators";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from "../Form/Input";
import './TypeEdit.css';

const TYPE_FORM = {
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
  category: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
};

class TypeEdit extends Component {
  state = {
    typeForm: TYPE_FORM,
    formIsValid: false,
    types: [],
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedType !== this.props.selectedType
    ) {
      const typeForm = {
        title: {
          ...prevState.typeForm.title,
          value: this.props.selectedType.title,
          valid: true,
        },
        description: {
          ...prevState.typeForm.description,
          value: this.props.selectedType.description,
          valid: true,
        },
        category: {
          ...prevState.typeForm.category,
          value: this.props.selectedType.categoryId,
          valid: true,
        },
      
      };
      this.setState({ typeForm: typeForm, formIsValid: true});
    }
  }

  typeInputChangeHandler = (input, value) => {
    this.setState((prevState) => {
       
      let isValid = true;

      for (const validator of prevState.typeForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.typeForm,
        [input]: {
          ...prevState.typeForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        typeForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        typeForm: {
          ...prevState.typeForm,
          [input]: {
            ...prevState.typeForm[input],
            touched: true,
          },
        },
      };
    });
  };

  cancelTypeChangeHandler = () => {
    this.setState({
      typeForm: TYPE_FORM,
      formIsValid: false,
    });

    this.props.onCancelEdit();
  };

  acceptTypeChangeHandler = () => {

    const type = {
      title: this.state.typeForm.title.value,
      description: this.state.typeForm.description.value,
      categoryId: this.state.typeForm.category.value,
      placeId: window.location.href.split("/")[5]
    };

    this.props.onFinishEdit(type);
  };



  render() {


    const formTitle = this.props.selectedType
      ? "Edit Type"
      : "New Type";

    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelTypeChangeHandler} />
        <Modal
          title={formTitle}
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelTypeChangeHandler}
          onAcceptModal={this.acceptTypeChangeHandler}
          isLoading={this.props.loading}
        >
          <form encType="multipart/form-data">
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.typeInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "title")}
              valid={this.state.typeForm["title"].valid}
              touched={this.state.typeForm["title"].touched}
              value={this.state.typeForm["title"].value}
            />
            <Input
              id="description"
              label="Description"
              control="input"
              onChange={this.typeInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "description")}
              valid={this.state.typeForm["description"].valid}
              touched={this.state.typeForm["description"].touched}
              value={this.state.typeForm["description"].value}
            />
            
            <Input
              id="category"
              label="Category"
              control="select"
              options={this.props.categories}
              onChange={this.typeInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "category")}
              valid={this.state.typeForm["category"].valid}
              touched={this.state.typeForm["category"].touched}
              value={this.state.typeForm["category"].value}
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
  }),
  {
  }
)(TypeEdit);
