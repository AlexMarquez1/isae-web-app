import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./components/Login/auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {        
        if (auth.isAuthenticated()) {
            props.userdata = auth.getAuthenticated();
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};
