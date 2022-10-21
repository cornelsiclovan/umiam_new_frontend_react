import { Fragment } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPlaces } from "../../actions/clientActions"

class PlaceList extends Component {
    componentDidMount(){
        this.props.getPlaces();
    }
    
    render() {
    
        return (
            <Fragment>
                 {
                    this.props.placeList &&
                    this.props.placeList.map(place => (
                       <NavLink to={`/places/${place.id}`}>{place.title}</NavLink>
                    ))
                }
            </Fragment>
               
         
        )
    }

}

export default connect(
    (state) => ({
        placeList: state.places.clientPlaceList
    }),
    {   
        getPlaces
    }
  )(PlaceList);
  