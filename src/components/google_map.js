import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap , Marker} from "react-google-maps";



export default class GoogleMapComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: this.props.lat,
          lng: this.props.lon,
        },
        key: `s`,
        defaultAnimation: 2,
      }],
    };
  }

  addMarker() {
    if( this.props.addMarker ) {
      return this.state.markers.map((marker) => {
        return (
          <Marker
            {...marker}
          />
        );
      });
    }
    return;
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ <div style={{ height: '500px' , 'marginBottom' : '1em' }} /> }
        googleMapElement = {
          <GoogleMap onClick={this.props.onMapClick} defaultZoom={ this.props.addMarker ? 13 : 8 } defaultCenter={{ lat : this.props.lat, lng : this.props.lon }} >
            { this.addMarker() }
          </GoogleMap>

        }
      />
    );
  }
}
