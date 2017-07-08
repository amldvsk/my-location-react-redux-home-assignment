import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getLocation } from '../actions/index';
import GoogleMap from './google_map';

export default class Location extends Component {

  componentWillMount() {
    navigator.vibrate(1000);
    this.props.getLocation(this.props.params.cat_id, this.props.params.loc_id);
  }

  render() {
    if( !this.props.location ) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="jumbotron">
        <h2 className="display-3">{this.props.location.name}</h2>
        <p className="lead" >{this.props.location.address}</p>

        <GoogleMap onMapClick={null} lon={this.props.location.coordinates[1]} lat={this.props.location.coordinates[0]} addMarker={true}/>

      </div>
    );
  }
}



function mapStateToProps(state) {
  return { location : state.categories.location };
}

export default connect(mapStateToProps, { getLocation })(Location);
