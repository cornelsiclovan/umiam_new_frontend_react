import { Component, Fragment } from "react";
import { required, length } from "../../util/validators";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from "../Form/Input";
import './CategoryEdit.css';

const CATEGORY_FORM = {
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
};

class CategoryEdit extends Component {
  state = {
    categoryForm: CATEGORY_FORM,
    formIsValid: false,
    types: [],
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedType !== this.props.selectedType
    ) {
      const categoryForm = {
        title: {
          ...prevState.categoryForm.title,
          value: this.props.selectedType.title,
          valid: true,
        },
        description: {
          ...prevState.categoryForm.description,
          value: this.props.selectedType.description,
          valid: true,
        },
      
      };
      this.setState({ categoryForm: categoryForm, formIsValid: true});
    }
  }

  categoryInputChangeHandler = (input, value) => {
    this.setState((prevState) => {
       
      let isValid = true;

      for (const validator of prevState.categoryForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.categoryForm,
        [input]: {
          ...prevState.categoryForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        categoryForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        typeForm: {
          ...prevState.categoryForm,
          [input]: {
            ...prevState.categoryForm[input],
            touched: true,
          },
        },
      };
    });
  };

  cancelCategoryChangeHandler = () => {
    this.setState({
      categoryForm: CATEGORY_FORM,
      formIsValid: false,
    });

    this.props.onCancelEdit();
  };

  acceptCategoryChangeHandler = () => {

    const type = {
      title: this.state.categoryForm.title.value,
      description: this.state.categoryForm.description.value,
      placeId: window.location.href.split("/")[5]
    };

    this.props.onFinishEdit(type);
  };



  render() {


    const formTitle = this.props.selectedType
      ? "Edit Category"
      : "New Category";

    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelCategoryChangeHandler} />
        <Modal
          title={formTitle}
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelCategoryChangeHandler}
          onAcceptModal={this.acceptCategoryChangeHandler}
          isLoading={this.props.loading}
        >
          <form encType="multipart/form-data">
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.categoryInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "title")}
              valid={this.state.categoryForm["title"].valid}
              touched={this.state.categoryForm["title"].touched}
              value={this.state.categoryForm["title"].value}
            />
            <Input
              id="description"
              label="Description"
              control="input"
              onChange={this.categoryInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "description")}
              valid={this.state.categoryForm["description"].valid}
              touched={this.state.categoryForm["description"].touched}
              value={this.state.categoryForm["description"].value}
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
)(CategoryEdit);
