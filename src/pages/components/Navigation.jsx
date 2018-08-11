import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ProfileContext } from "../app/profile/components/ProfileContext";

function Navigation(props) {
  let currentYear = new Date().getFullYear();
  if (currentYear > 2018) {
    currentYear = "2018 - " + currentYear;
  }

  const url = "/p/" + props.username;
  return (
    <React.Fragment>
      <div className="logo">
        <Link to="/">
          <img className="img-responsive" alt="logo" src="/images/logo.png" />
        </Link>
      </div>
      <ProfileContext.Consumer>
        {profileContext => (
          <nav
            id="nav"
            className={
              "animated fadeInLeft is-editable-" + profileContext.canEdit
            }>
            <div className="logo-space" />
            <ul>
              <React.Fragment>
                <li
                  type="button"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Home">
                  <Link
                    to={url}
                    className={classnames({
                      active: location.pathname === url
                    })}>
                    <i className="menu fa fa-home" />
                  </Link>
                </li>
                {!profileContext.profile || (
                  <React.Fragment>
                    <li>
                      <Link
                        to={url + "/about"}
                        type="button"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="About"
                        className={classnames({
                          active: location.pathname === url + "/about"
                        })}>
                        <i className="menu zmdi zmdi-account-box-o" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={url + "/qualification"}
                        type="button"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Qualification"
                        className={classnames({
                          active: location.pathname === url + "/qualification"
                        })}>
                        <i className="menu fa fa-trophy" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={url + "/experience"}
                        type="button"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Experience"
                        className={classnames({
                          active: location.pathname === url + "/experience"
                        })}>
                        <i className="menu zmdi zmdi-graduation-cap" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={url + "/contact"}
                        type="button"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Contact"
                        className={classnames({
                          active: location.pathname === url + "/contact"
                        })}>
                        <i className="menu zmdi zmdi-email " />
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </React.Fragment>
            </ul>
            <div className="bottom">&copy; {currentYear}</div>
            {!profileContext.canEdit || (
              <Link
                className="nav-controller"
                to={url + "/edit"}
                data-toggle="tooltip"
                data-placement="right"
                title="Edit profile"
              />
            )}
          </nav>
        )}
      </ProfileContext.Consumer>
    </React.Fragment>
  );
}

Navigation.propTypes = {
  username: PropTypes.string.isRequired
};

export { Navigation };
