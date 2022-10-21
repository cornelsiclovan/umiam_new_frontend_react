import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Place from "../../../components/Places/Place/Place";
import Loader from "../../../components/Loader/Loader";
import PlaceEdit from "../../../components/Places/PlaceEdit/PlaceEdit";
import Button from "../../../components/Button/Button";

import {
  getPlaces,
  addPlace,
  editPlace,
  deletePlace,
} from "../../../actions/ownerActions";
import "./Places.css";

class Places extends Component {
  state = {
    isEditing: false,
    editPlace: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getPlaces(this.props.token);
  };

  newPlaceHandler = () => {
    this.setState({ isEditing: true });
  };

  startEditPlaceHandler = (placeId) => {
    const loadedPlace = { ...this.props.places.find((p) => p.id === placeId) };

    this.setState({
      isEditing: true,
      editPlace: loadedPlace,
    });
  };

  onFinishEditHandler = (place) => {
    const formAction = this.state.editPlace ? "edit" : "new";

    if (formAction === "new") this.props.addPlace(this.props.token, place);

    if (formAction === "edit") {
      this.props.editPlace(this.props.token, place, this.state.editPlace.id);
    }

    this.setState({
      isEditing: false,
    });
  };

  cancelEditHandler = () => {
    this.setState({
      isEditing: false,
      editPlace: null,
    });
  };

  deletePlaceHandler = (placeId) => {
    this.props.deletePlace(this.props.token, placeId);
  };

  render() {
    return (
      <Fragment>
        <PlaceEdit
          editing={this.state.isEditing}
          selectedPlace={this.state.editPlace}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.onFinishEditHandler}
        />
        <section className="feed">
          {this.props.isFetching && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loader />
            </div>
          )}
          {!this.props.isFetching &&
            this.props.places &&
            this.props.places.map((place) => (
              <Place
                key={place.id}
                id={place.id}
                title={place.title}
                description={place.description}
                location={place.location}
                tableNumber={place.tableNumber}
                createdAt={place.createdAt}
                updatedAt={place.updatedAt}
                onStartEdit={this.startEditPlaceHandler.bind(this, place.id)}
                onDelete={this.deletePlaceHandler.bind(this, place.id)}
              />
            ))}
        </section>
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPlaceHandler}>
            New Place
          </Button>
        </section>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    places: state.places.placeList,
    isFetching: state.places.isFetching,
  }),
  {
    getPlaces,
    addPlace,
    editPlace,
    deletePlace,
  }
)(Places);
