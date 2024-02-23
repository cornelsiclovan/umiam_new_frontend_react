import React, { Component } from "react";
import { Fragment } from "react";
import Button from "../../../../components/Button/Button";
import { connect } from "react-redux";
import {
  getPlace,
  getCategories,
  getTypes,
  addType,
  editType,
  deleteType,
  addCategory,
  editCategory,
  deleteCategory,
} from "../../../../actions/ownerActions";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../../../actions/productActions";

import Filter from "../../../../components/Filter/Filter";

import "./Place.css";
import ProductEdit from "../../../../components/Products/ProductEdit";
import TypeEdit from "../../../../components/Types/TypeEdit";
import CategoryEdit from "../../../../components/Categories/CategoryEdit";

class Place extends Component {
  state = {
    isEditingType: false,
    editType: null,
    isEditingProduct: false,
    editProduct: null,
    isEditingCategory: false,
    editCategory: null,
  };

  componentDidMount() {
    const placeId = window.location.href.split("/")[5];
    this.props.getPlace(this.props.token, placeId);
    this.props.getCategories(this.props.token);
    this.props.getTypes(this.props.token, placeId);
    this.props.fetchProducts(this.props.token);
  }

  newProductHandler = () => {
    this.setState({ isEditingProduct: true });
  };

  newTypeHandler = () => {
    this.setState({ isEditingType: true });
  };

  startEditProductHandler = (productId) => {
    const loadedProduct = {
      ...this.props.products.find((p) => p.id === productId),
    };

    this.setState({
      isEditingProduct: true,
      editProduct: loadedProduct,
    });
  };

  startEditTypeHandler = (typeId) => {
    const loadedType = { ...this.props.types.find((t) => t.id === typeId) };

    this.setState({
      isEditingType: true,
      editType: loadedType,
    });
  };

  onFinishEditProductHandler = (product) => {
    const formAction = this.state.editProduct ? "edit" : "new";

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    formData.append("typeId", product.typeId);
    formData.append("price", product.price);
    formData.append("placeId", product.placeId);
    formData.append("image", product.image);

    if (formAction === "new") {
      this.props.addProduct(this.props.token, formData);
    }

    if (formAction === "edit") {
      this.props.editProduct(
        this.props.token,
        formData,
        this.state.editProduct.id
      );
    }

    this.setState({
      isEditingProduct: false,
      editProduct: null,
    });
  };

  onFinishEditTypeHandler = (type) => {
    const formAction = this.state.editType ? "edit" : "new";

    if (formAction === "new") {
      this.props.addType(this.props.token, type);
    }

    if (formAction === "edit") {
      this.props.editType(this.props.token, type, this.state.editType.id);
    }

    this.setState({
      isEditingType: false,
      editType: null,
    });
  };

  deleteProductButtonHandler = (productId) => {
    this.props.deleteProduct(this.props.token, productId);
  };

  deleteTypeButtonHandler = (typeId) => {
    this.props.deleteType(this.props.token, typeId);
  };

  newCategoryHandler = () => {
    this.setState({
      isEditingCategory: true,
    });
  };

  onFinishEditCategoryHandler = (category) => {
    const formAction = this.state.editCategory ? "edit" : "new";


    if (formAction === "new") {
      this.props.addCategory(this.props.token, category);
    }

    if (formAction === "edit") {
      this.props.editCategory(this.props.token, category, this.state.editCategory.id);
    }

    this.setState({
      isEditingCategory: false,
      editCategory: null,
    });
  };

  startEditCategoryHandler = (categoryId) => {
    const loadedCategory = { ...this.props.categories.find((t) => t.id === categoryId) };

    this.setState({
      isEditingCategory: true,
      editCategory: loadedCategory,
    });
  };

  deleteCategoryButtonHandler = (categoryId) => {
    this.props.deleteCategory(this.props.token, categoryId);
  };

  onCancelEditHandler = () => {
    this.setState({
      editProduct: null,
      isEditingProduct: false,
      isEditingType: false,
      isEditingCategory: false,
      editType: null,
      editCategory: null,
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.types && <Filter />}

        {this.props.place && <h1>{this.props.place.title}</h1>}

        <h2>Categories</h2>

        <CategoryEdit
          editing={this.state.isEditingCategory}
          selectedType={this.state.editCategory}
          onCancelEdit={this.onCancelEditHandler}
          onFinishEdit={this.onFinishEditCategoryHandler}
          categories={this.props.categories}
        />

        {this.props.categories && (
          <table id="types">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                  <td>{category.createdAt}</td>
                  <td>{category.updatedAt}</td>
                  <td>
                    <Button
                      mode="raised"
                      design="accent"
                      onClick={() => this.startEditCategoryHandler(category.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      mode="raised"
                      onClick={() =>
                        this.deleteCategoryButtonHandler(category.id)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <br />
        <section className="feed__control">
          <Button
            mode="raised"
            design="accent"
            onClick={this.newCategoryHandler}
          >
            New Category
          </Button>
        </section>

        <h2> Types </h2>

        <TypeEdit
          editing={this.state.isEditingType}
          selectedType={this.state.editType}
          onCancelEdit={this.onCancelEditHandler}
          onFinishEdit={this.onFinishEditTypeHandler}
          categories={this.props.categories}
        />

        {this.props.filteredTypes && (
          <table id="types">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.filteredTypes.map((type) => (
                <tr key={type.id}>
                  <td>{type.id}</td>
                  <td>{type.title}</td>
                  <td>{type.category}</td>
                  <td>{type.description}</td>
                  <td>{type.createdAt}</td>
                  <td>{type.updatedAt}</td>
                  <td>
                    <Button
                      mode="raised"
                      design="accent"
                      onClick={() => this.startEditTypeHandler(type.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      mode="raised"
                      onClick={() => this.deleteTypeButtonHandler(type.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <br />
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newTypeHandler}>
            New Type
          </Button>
        </section>

        <h2>Products</h2>

        <ProductEdit
          editing={this.state.isEditingProduct}
          selectedProduct={this.state.editProduct}
          onCancelEdit={this.onCancelEditHandler}
          onFinishEdit={this.onFinishEditProductHandler}
          types={this.props.types}
          categories={this.props.categories}
        />

        {this.props.products && (
          <table id="types">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.createdAt}</td>
                  <td>{product.updatedAt}</td>
                  <td>{product.category}</td>
                  <td>{product.type}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      mode="raised"
                      design="accent"
                      onClick={() => this.startEditProductHandler(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      mode="raised"
                      onClick={() =>
                        this.deleteProductButtonHandler(product.id)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <br />
        <section className="feed__control">
          <Button
            mode="raised"
            design="accent"
            onClick={this.newProductHandler}
          >
            New Product
          </Button>
        </section>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    place: state.places.place,
    categories: state.categories.categories,
    filteredTypes: state.types.filteredTypes,
    types: state.types.types,
    products: state.products.filteredItems,
  }),
  {
    getPlace,
    getCategories,
    getTypes,
    fetchProducts,
    addProduct,
    editProduct,
    deleteProduct,
    addType,
    editType,
    deleteType,
    addCategory,
    editCategory,
    deleteCategory,
  }
)(Place);
