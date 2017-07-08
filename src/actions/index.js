
import _ from 'lodash';
import axios from 'axios';

export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const GET_ADDRESS = 'GET_ADDRESS';
export const GET_CATEGORY = 'GET_ADDRESS';
export const GET_LOCATION = 'GET_LOCATION';

export function getCategories() {
  let categories = localStorage.getItem( 'categories' );
  if( !categories ) {
    categories = [];
    localStorage.setItem( 'categories', JSON.stringify(categories) );
  }
  return {
    type : GET_CATEGORIES,
    payload: JSON.parse(localStorage.getItem( 'categories' ))
  };
}

export function getCategory(category) {
  let categories = JSON.parse(localStorage.getItem( 'categories' ));
  return {
    type : GET_CATEGORY,
    payload: categories[category-1]
  };
}


export function addLocation(props) {
  const locationIndex = props.location;
  if(props.location) {
    delete props[location];
  }
  const index = parseInt(props.category) - 1;
  let categories = JSON.parse(localStorage.getItem( 'categories' ));
  let category = categories[index];
  if( category ) {
    if(!category.locations) {
        category.locations = [];
    }
    if( !locationIndex ) {
      category.locations.push(props);

    } else {
      category.locations[locationIndex - 1] = props;
    }
    categories[index] = category;
    localStorage.setItem( 'categories', JSON.stringify(categories) );

  }

  return {
    type : ADD_LOCATION,
    payload: categories
  };
}

export function getLocation(category, location) {
  let categories = JSON.parse(localStorage.getItem( 'categories' ));
  const categoryIndex = categories[category-1];
  return {
    type : GET_LOCATION,
    payload: categoryIndex.locations[location-1]
  };
}


export function addCategory(props) {
  let categories = localStorage.getItem( 'categories' );
  if( !categories ) {
    categories = [];
    categories.push({name : props.name});
    localStorage.setItem( 'categories', JSON.stringify(categories) );
  } else {
    categories = JSON.parse(categories);
    if( !_.find(categories, {name : props.name}) && !props.category ) {
      categories.push({name : props.name});
      localStorage.setItem( 'categories', JSON.stringify(categories) );
    }
    if( props.category && !_.find(categories, {name : props.name}) ) {
      categories[props.category - 1].name = props.name ;
      localStorage.setItem( 'categories', JSON.stringify(categories) );
    }
  }

  return {
    type : ADD_CATEGORY,
    payload: categories
  };
}


export function removeCategory(category) {

  let categories = JSON.parse(localStorage.getItem( 'categories' ));
  _.remove(categories, category)
  localStorage.setItem( 'categories', JSON.stringify(categories) );
  return {
    type : DELETE_CATEGORY,
    payload: categories
  };
}


export function removeLocation(location) {
  let categories = JSON.parse(localStorage.getItem( 'categories' ));
  let cat = categories[parseInt(location.category) - 1];
  _.remove(cat.locations, location)
  localStorage.setItem( 'categories', JSON.stringify(categories) );
  return {
    type : DELETE_LOCATION,
    payload: categories
  };
}

export function getAddressFromCoords(lat, lng) {
  const request = axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`);
  return {
    type : GET_ADDRESS,
    payload:request
  };
}
