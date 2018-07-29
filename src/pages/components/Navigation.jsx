import React from "react";
import { Link } from "react-router-dom";

function Navigation(props) {
  let currentYear = new Date().getFullYear();
  if (currentYear > 2018) {
    currentYear = "2018 - " + currentYear;
  }

  const url = "/p/" + props.username;

  const extendedPages = props.exist ? (<React.Fragment><li id="tt2">
    <Link className="smooth" to={url + "/about"}>
      <i className="menu zmdi zmdi-account-box-o" />
      <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt2">
        About
    </div>
    </Link>
  </li>
    <li id="tt3">
      <Link className="smooth" to={url + "/qualification"}>
        <i className="menu fa fa-trophy" />
        <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt4">
          Qualification
    </div>
      </Link>
    </li>
    <li id="tt4">
      <Link className="smooth" to={url + "/experience"}>
        <i className="menu zmdi zmdi-graduation-cap" />
        <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt3">
          Experience
    </div>
      </Link>
    </li>
    <li id="tt5">
      <Link className="smooth" to={url + "/contact"}>
        <i className="menu zmdi zmdi-email " />
        <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt6">
          Contact
    </div>
      </Link>
    </li></React.Fragment>) : ""

  return (
    <nav id="nav">
      <div className="logo">
        <Link to="/">
          <img className="img-responsive" alt="logo" src="/images/logo.png" />
        </Link>
      </div>
      <ul>
        <li id="tt1">
          <Link className="smooth" to={url}>
            <i className="menu fa fa-home" />
            <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="tt1">
              Home
            </div>
          </Link>
        </li>
        {extendedPages}
      </ul>
      <div className="bottom">
        <p>&copy; {currentYear}</p>
      </div>
      <Link className="nav-controller" to="/editprofile" />
    </nav>
  );
}

export { Navigation };
