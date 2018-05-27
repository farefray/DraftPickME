import React from "react";

export class Navigation extends React.Component {
  render() {
    return (
      <nav id="nav">
        <div className="logo">
          <img className="img-responsive" alt="logo" src="img/deco.svg" />
          <span>RPF</span>
        </div>
        <ul>
          <li id="tt1">
            <a className="smooth" href="#home">
              <i className="menu fa fa-home" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt1"
              >
                home
              </div>
            </a>
          </li>
          <li id="tt2">
            <a className="smooth" href="#about">
              <i className="menu zmdi zmdi-account-box-o" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt2"
              >
                about
              </div>
            </a>
          </li>
          <li id="tt3">
            <a className="smooth" href="#education">
              <i className="menu zmdi zmdi-graduation-cap" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt3"
              >
                education
              </div>
            </a>
          </li>
          <li id="tt4">
            <a className="smooth" href="#experience">
              <i className="menu fa fa-trophy" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt4"
              >
                experience
              </div>
            </a>
          </li>
          <li id="tt5">
            <a className="smooth" href="#portfolio">
              <i className="menu fa fa-briefcase" />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt5"
              >
                portfolio
              </div>
            </a>
          </li>
          <li id="tt6">
            <a className="smooth" href="#contact">
              <i className="menu zmdi zmdi-email " />
              <div
                className="mdl-tooltip mdl-tooltip--right"
                data-mdl-for="tt6"
              >
                contact
              </div>
            </a>
          </li>
        </ul>
        <p>&copy; 2017</p>
        <div className="nav-controller" />
      </nav>
    );
  }
}
