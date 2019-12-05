import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticate } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props => isAuthenticate() 
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />
);

export default PrivateRoute;