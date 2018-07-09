import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
    // fixme, it triggers multiple redirect to /login if not authenticated
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
