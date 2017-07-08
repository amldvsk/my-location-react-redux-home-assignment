import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCategory } from '../actions/index';

export default class Category extends Component {

  componentWillMount() {
    this.props.getCategory(this.props.params.id);
  }

  renderLocations() {
    if( !this.props.category.locations ) {return;}
    let i =0;
    return this.props.category.locations.map((location) => {
      return (
        <li key={i++} >{location.name}</li>
      );
    });
  }

  render() {
    if( !this.props.category ) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="jumbotron">
        <h2 className="display-3">{this.props.category.name}</h2>
        <ul className="list-unstyled" >
          {this.renderLocations()}
        </ul>
      </div>
    );
  }
}




function mapStateToProps(state) {
  return {category : state.categories.category};
}

export default connect(mapStateToProps, {getCategory})(Category);
