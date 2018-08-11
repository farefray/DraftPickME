import React from 'react';
import PropTypes from "prop-types";

const SocialLinks = (props) => {
  return (props.github || props.facebook || props.linkedin ? (
    <div>
      <div className="col-md-12 no-padding-left">
        <ul>
          <li className="social-media">
            <p className="info-title">Social Links</p>
          </li>
          {!props.github || (
            <li className="social-media icons">
              <a href={props.github} target="_blank" rel="noopener">
                <i className="fa fa-github" />
              </a>
            </li>
          )}
          {props.linkedin ? (
            <li className="social-media icons">
              <a href={props.linkedin} target="_blank" rel="noopener">
                <i className="fa fa-linkedin" />
              </a>
            </li>
          ) : (
            ""
          )}
          {props.facebook ? (
            <li className="social-media icons">
              <a href={props.facebook} target="_blank" rel="noopener">
                <i className="fa fa-facebook" />
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  ) : (
    <div />
  ))
}

SocialLinks.propTypes = {
  github: PropTypes.string,
  linkedin: PropTypes.string,
  facebook: PropTypes.string
};

export default SocialLinks;
