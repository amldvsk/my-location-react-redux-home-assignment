
import { GET_ADDRESS } from '../actions/index';

const INITAL_STATE = { address: null};


export default function( state = INITAL_STATE, action ) {
  switch(action.type) {
    case GET_ADDRESS : {
      return {...state, address:action.payload}
    }
  }
  return state;
}
