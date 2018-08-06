import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navigation(props) {
  let currentYear = new Date().getFullYear();
  if (currentYear > 2018) {
    currentYear = "2018 - " + currentYear;
  }

  const url = "/p/" + props.username;
  const extendedPages = props.exist ? (
    <React.Fragment>
      <li id="tt2">
        <Link to={url + "/about"}>
          <i className="menu zmdi zmdi-account-box-o" />
          <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt2">
            About
          </div>
        </Link>
      </li>
      <li id="tt3">
        <Link to={url + "/qualification"}>
          <i className="menu fa fa-trophy" />
          <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt4">
            Qualification
          </div>
        </Link>
      </li>
      <li id="tt4">
        <Link to={url + "/experience"}>
          <i className="menu zmdi zmdi-graduation-cap" />
          <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt3">
            Experience
          </div>
        </Link>
      </li>
      <li id="tt5">
        <Link to={url + "/contact"}>
          <i className="menu zmdi zmdi-email " />
          <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt6">
            Contact
          </div>
        </Link>
      </li>
    </React.Fragment>
  ) : (
    ""
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
        <ul>
          <li id="tt1">
            <Link to={url}>
              <i className="menu fa fa-home" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt1">
                Home
              </div>
            </Link>
          </li>
          {extendedPages}
        </ul>
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
