import React from 'react';
import { Route, IndexRoute } from 'react-router';



import App from './components/app';
import Front from './components/front';
import Categories from './components/categoreis';
import Locations from './components/locations';
import Category from './components/category';
import Location from './components/location';


export default (
    <Route path="/" component={App} >
    <IndexRoute component={Front} />
      <Route path="/categories" component={Categories} />
      <Route path="/locations" component={Locations} />
      <Route path="/cat/:id" component={Category} />
      <Route path="/loc/:cat_id/:loc_id" component={Location} />

    </Route>
);
