import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm, reset } from 'redux-form';
import { addLocation, getCategories, getAddressFromCoords, removeLocation } from '../actions/index';
import _ from 'lodash';
import GoogleMap from './google_map';


class Locations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisble : false,
      addressCanChange : false,
    };
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentWillMount() {
    this.props.getCategories()
  }

  showForm() {
    this.setState({ formVisble : !this.state.formVisble });
  }

  onSubmit(props) {
    this.props.addLocation(props);
    this.props.dispatch(reset('newLocationsForm'));
    this.props.getCategories();
  }

  editLocation(location, index) {
    this.props.fields.name.onChange(location.name);
    this.props.fields.address.onChange(location.address);
    this.props.fields.coordinates.onChange(location.coordinates);
    this.props.fields.category.onChange(location.category);
    this.props.fields.location.onChange(index);
    this.setState({ formVisble : true });
  }

  renderCategory() {
    let i = 0;
    return this.props.categories.map( (category) => {
      return (
        <option  key={i++} value={i} >{ category.name }</option>
      );
    });
  }

  deleteLocation(location) {
    this.props.removeLocation(location);
    this.props.getCategories();
  }

  renderLocations() {
    let i = 0;
    let j = 0;
    return this.props.categories.map( (category) => {
      i++;
      if( category.locations ) {
        return category.locations.map((location) => {
          return (
            <tr key={j++}  >
              <td><a onClick={ this.deleteLocation.bind(this, location) } ><i className="fa fa-times" ></i></a></td>
              <td><Link to={ 'loc/'+i+'/'+j }>{ location.name }</Link></td>
              <td>{ location.address }</td>
              {/* <td>{ location.coordinates }</td> */}
              <td>{ category.name }</td>
              <td><a onClick={ this.editLocation.bind(this, location, j) } ><i className="fa fa-pencil-square-o" ></i></a></td>
            </tr>
          );
        })
      }
      return;
    });
  }

  onMapClick(event) {
    this.setState({ addressCanChange : true });
    this.props.fields.coordinates.onChange([ event.latLng.lat(), event.latLng.lng() ])
    this.props.getAddressFromCoords(event.latLng.lat(), event.latLng.lng()).then((result) => {
      this.setState({ addressCanChange : false });
      this.props.fields.address.onChange(this.props.address.data.results[0].formatted_address);
    });
  }

  render() {
    const { fields : { name, address, coordinates, category, location }, handleSubmit } = this.props;
    const lat = 31.0461;
    const lon = 34.8516;
    return (
      <div>
      <header className="header clearfix" >
        <div className="pull-left" ><Link  to="/" ><i className="fa fa-angle-left" ></i></Link></div>
        <div className="pull-right" ><button className="" onClick={ () => {this.showForm()} } ><i className="fa fa-plus-circle" ></i></button></div>
      </header>
        <div className="jumbotron">
          <h2 className="display-3">Locations</h2>
          <form className={this.state.formVisble ? 'show' : ''} onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>

            <GoogleMap onMapClick={_.debounce(this.onMapClick, 300)} lon={lon} lat={lat} />

            <div className={ `form-group ${ name.touched && name.invalid ? 'has-danger' : '' }` } >
              <input className={ `form-control ${ name.touched && name.invalid ? 'form-control-danger' : ''}` } placeholder="name" {...name} />
              <div className="form-control-feedback" >{ name.touched ?  name.error : ''}</div>
            </div>

            <div className={ `form-group ${ address.touched && address.invalid ? 'has-danger' : '' }` } >
              <input className={ `form-control ${ address.touched && address.invalid ? 'form-control-danger' : ''}` } readOnly={this.state.addressCanChange} placeholder="address" {...address} />
              <div className="form-control-feedback" >{ address.touched ?  address.error : ''}</div>
            </div>
            <div className={ `form-group ${ coordinates.touched && coordinates.invalid ? 'has-danger' : '' }` } >
              <input className={ `form-control ${ coordinates.touched && coordinates.invalid ? 'form-control-danger' : ''}` } readOnly placeholder="Click on the map tho get the Coordinates" {...coordinates} />
              <div className="form-control-feedback" >{ coordinates.touched ?  coordinates.error : ''}</div>
            </div>
            <div className={ `form-group ${ category.touched && category.invalid ? 'has-danger' : '' }` } >
              <select className={ `form-control ${ category.touched && category.invalid ? 'form-control-danger' : ''}` } placeholder="Category" {...category}>
                <option value="-1">choose a category</option>
                { this.renderCategory() }
              </select>
              <div className="form-control-feedback" >{ category.touched ?  category.error : ''}</div>
            </div>
            <input type="hidden" name="location" {...location} />
            <button className="btn" type="submit">Submit</button>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Delete</th>
                <th>Name</th>
                <th>Address</th>
                {/* <th>Coordinates</th> */}
                <th>Category</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              { this.renderLocations() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};

  if(!values.name) {
    errors.name = 'Enter a name';
  }

  if(!values.address) {
    errors.address = 'Enter your address';
  }

  if(!values.coordinates) {
    errors.coordinates = 'Enter coordinates';
  }

  if( !values.category || values.category === "-1" ) {
    errors.category = 'Please choose a category';
  }

  return errors;
}

function mapStateToProps(state) {
  return { categories : state.categories.all, address : state.address.address }
}

export default reduxForm({
  form : 'newLocationsForm',
  fields: ['name', 'address', 'coordinates', 'category', 'location'],
  validate
}, mapStateToProps, { addLocation, getCategories, getAddressFromCoords, removeLocation })(Locations);
