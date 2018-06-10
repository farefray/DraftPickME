import React from "react";
import { Link } from 'react-router-dom';

export class Navigation extends React.Component {
  render() {
    let currentYear = (new Date()).getFullYear();
    if(currentYear > 2018) {
      currentYear = '2018 - ' + currentYear;
    }

    return (
      <nav id="nav">
        <div className="logo">
          <img className="img-responsive" alt="logo" src="../images/deco.svg" />
          <span>DraftPickIT</span>
        </div>
        <ul>
          <li id="tt1">
            <Link className="smooth" to="/">
              <i className="menu fa fa-home" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt1"
              >
                home
              </div>
            </Link>
          </li>
          <li id="tt2">
            <Link className="smooth" to="/about">
              <i className="menu zmdi zmdi-account-box-o" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt2"
              >
                about
              </div>
            </Link>
          </li>
          <li id="tt3">
            <Link className="smooth" to="/education">
              <i className="menu zmdi zmdi-graduation-cap" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt3"
              >
                education
              </div>
            </Link>
          </li>
          <li id="tt4">
            <Link className="smooth" to="/experience">
              <i className="menu fa fa-trophy" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt4"
              >
                experience
              </div>
            </Link>
          </li>
          <li id="tt5">
            <Link className="smooth" to="/portfolio">
              <i className="menu fa fa-briefcase" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt5"
              >
                portfolio
              </div>
            </Link>
          </li>
          <li id="tt6">
            <Link className="smooth" to="/contact">
              <i className="menu zmdi zmdi-email " />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt6"
              >
                contact
              </div>
            </Link>
          </li>
        </ul>
        <div className="bottom">
        <p>&copy; {currentYear}</p>
        </div>
        <Link className="nav-controller" to="/profile" />
      </nav>
    );
  }
}
