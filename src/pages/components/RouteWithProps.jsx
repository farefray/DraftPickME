import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const RouteWithProps = ({ component: Component, path, ...rest }) => (
  <Route render={props => <Component path={path} {...props} {...rest} />} />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export { RouteWithProps };
