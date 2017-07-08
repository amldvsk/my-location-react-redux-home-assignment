
import { GET_CATEGORIES, GET_CATEGORY, GET_LOCATION } from '../actions/index';

const INITAL_STATE = { all: [], category : null, location : null};


export default function( state = INITAL_STATE, action ) {
  switch(action.type) {
    case GET_CATEGORIES : {
      return {...state, all:action.payload}
    }
    case GET_CATEGORY : {
      return {...state, category:action.payload}
    }
    case GET_LOCATION : {
      return {...state, location:action.payload}
    }
  }
  return state;
}
