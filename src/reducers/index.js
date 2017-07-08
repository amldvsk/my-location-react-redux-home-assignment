import { combineReducers } from 'redux';

import { reducer as fromReducer } from 'redux-form';
import CategoriesReducer from './reducer_categoires';
import AddressReducer from './reducer_address';

const rootReducer = combineReducers({
  categories : CategoriesReducer,
  address : AddressReducer,
  form: fromReducer
});

export default rootReducer;
