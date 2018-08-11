import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navigation(props) {
  let currentYear = new Date().getFullYear();
  if (currentYear > 2018) {
    currentYear = "2018 - " + currentYear;
  }

  const url = "/p/" + props.username;
  const navigationButtons = (
    <React.Fragment>
      <li type="button" data-toggle="tooltip" data-placement="right" title="Home">
        <Link to={url}>
          <i className="menu fa fa-home" />
        </Link>
      </li>
      {!props.exist || (
        <React.Fragment>
          <li>
            <Link to={url + "/about"} type="button" data-toggle="tooltip" data-placement="right" title="About">
              <i className="menu zmdi zmdi-account-box-o" />
            </Link>
          </li>
          <li>
            <Link to={url + "/qualification"} type="button" data-toggle="tooltip" data-placement="right" title="Qualification">
              <i className="menu fa fa-trophy" />
            </Link>
          </li>
          <li>
            <Link to={url + "/experience"} type="button" data-toggle="tooltip" data-placement="right" title="Experience">
              <i className="menu zmdi zmdi-graduation-cap" />
            </Link>
          </li>
          <li>
            <Link to={url + "/contact"} type="button" data-toggle="tooltip" data-placement="right" title="Contact">
              <i className="menu zmdi zmdi-email " />
            </Link>
          </li>
        </React.Fragment>
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className="logo">
        <Link to="/">
          <img className="img-responsive" alt="logo" src="/images/logo.png" />
        </Link>
      </div>
      <nav
        id="nav"
        className={"animated fadeInLeft is-editable-" + props.canEdit}>
        <div className="logo-space" />
        <ul>{navigationButtons}</ul>
        <div className="bottom">&copy; {currentYear}</div>
        {props.canEdit ? (
          <Link className="nav-controller" to={url + "/edit"} />
        ) : (
          ""
        )}
      </nav>
    </React.Fragment>
  );
}

Navigation.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  exist: PropTypes.bool.isRequired
};

export { Navigation };
