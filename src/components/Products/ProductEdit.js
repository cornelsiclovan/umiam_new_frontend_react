import { Component, Fragment } from "react";
import { required, length } from "../../util/validators";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from "../Form/Input";
import FilePicker from "../Form/FilePicker";
import { addProduct, editProduct } from "../../actions/productActions";
import { generateBase64FromImage } from "../../util/image";
import Image from "../Image/Image";
import './ProductEdit.css';

const PRODUCT_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 3 })],
  },
  description: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  price: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required]
  },
  category: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  type: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
};

class ProductEdit extends Component {
  state = {
    productForm: PRODUCT_FORM,
    formIsValid: false,
    types: [],
    imagePreview: null,
    file: null
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedProduct !== this.props.selectedProduct
    ) {
      const productForm = {
        title: {
          ...prevState.productForm.title,
          value: this.props.selectedProduct.title,
          valid: true,
        },
        description: {
          ...prevState.productForm.description,
          value: this.props.selectedProduct.description,
          valid: true,
        },
        image: {
          ...prevState.productForm.image,
          value: this.props.selectedProduct.image,
          valid: true,
        },
        category: {
          ...prevState.productForm.category,
          value: this.props.selectedProduct.categoryId,
          valid: true,
        },
        price: {
          ...prevState.productForm.price,
          value: this.props.selectedProduct.price,
          valid: true
        },
        type: {
          ...prevState.productForm.type,
          value: this.props.selectedProduct.typeId,
          valid: true,
        },
      };
      this.setState({ productForm: productForm, formIsValid: true});
    }
  }

  productInputChangeHandler = (input, value, files) => {
    if(files) {
      this.setState({file: files[0]})
      generateBase64FromImage(files[0])
      .then(b64 => {
        
        this.setState({ imagePreview: b64 });
      }).catch(e => {
        this.setState({ imagePreview: null });
      });
    }

    this.setState((prevState) => {
      let isValid = true;
      if (input === "category") {
        this.setState({
          types: this.props.types.filter((x) => +x.categoryId === +value),
        });
      }
      for (const validator of prevState.productForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.productForm,
        [input]: {
          ...prevState.productForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        productForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        productForm: {
          ...prevState.productForm,
          [input]: {
            ...prevState.productForm[input],
            touched: true,
          },
        },
      };
    });
  };

  cancelProductChangeHandler = () => {
    this.setState({
      productForm: PRODUCT_FORM,
      formIsValid: false,
    });

    this.props.onCancelEdit();
  };

  acceptProductChangeHandler = () => {
    const product = {
      title: this.state.productForm.title.value,
      description: this.state.productForm.description.value,
      categoryId: this.state.productForm.category.value,
      typeId: this.state.productForm.type.value,
      price: this.state.productForm.price.value,
      image: this.state.file,
      placeId: window.location.href.split("/")[5]
    };

    this.props.onFinishEdit(product);
  };



  render() {
    const formTitle = this.props.selectedProduct
      ? "Edit Product"
      : "New Product";

    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelProductChangeHandler} />
        <Modal
          title={formTitle}
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelProductChangeHandler}
          onAcceptModal={this.acceptProductChangeHandler}
          isLoading={this.props.loading}
        >
          <form encType="multipart/form-data">
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "title")}
              valid={this.state.productForm["title"].valid}
              touched={this.state.productForm["title"].touched}
              value={this.state.productForm["title"].value}
            />
            <Input
              id="description"
              label="Description"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "description")}
              valid={this.state.productForm["description"].valid}
              touched={this.state.productForm["description"].touched}
              value={this.state.productForm["description"].value}
            />
              <Input
              id="price"
              label="Price"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "price")}
              valid={this.state.productForm["price"].valid}
              touched={this.state.productForm["price"].touched}
              value={this.state.productForm["price"].value}
            />
            <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={ this.productInputChangeHandler }
              onBlur={ this.inputBlurHandler.bind(this, "image") }
              valid={ this.state.productForm["image"].valid }
              touched={ this.state.productForm["image"].touched }
            />
              <div className="new-item__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {
                this.state.imagePreview && (
                  <Image imageUrl={this.state.imagePreview} contain left />
              )}
            </div>
            <Input
              id="category"
              label="Category"
              control="select"
              options={this.props.categories}
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "category")}
              valid={this.state.productForm["category"].valid}
              touched={this.state.productForm["category"].touched}
              value={this.state.productForm["category"].value}
            />
        
            <Input
              id="type"
              label="Type"
              control="select"
              options={this.state.types}
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "type")}
              valid={this.state.productForm["type"].valid}
              touched={this.state.productForm["type"].touched}
              value={this.state.productForm["type"].value}
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
    products: state.products.products,
  }),
  {
    addProduct,
    editProduct,
  }
)(ProductEdit);
