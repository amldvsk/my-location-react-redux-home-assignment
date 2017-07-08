import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    const ACTIVE = { background: '#66B1EB', color:'#fff'};
    return (
      <div className="footer">
        <div >
          <Link to="/categories" activeStyle={ACTIVE} className="btn btn-block"><i className="fa fa-bars" ></i> Categoreis</Link>
        </div>
        <div>
          <Link  to="/locations" activeStyle={ACTIVE} className="btn btn-block"><i className="fa fa-map-pin" ></i> Locations</Link>
        </div>
      </div>
    );
  }
}
