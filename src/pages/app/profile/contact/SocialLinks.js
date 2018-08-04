import React from 'react';
import PropTypes from "prop-types";

const SocialLinks = (props) => {
  return props.github || props.facebook || props.linkedin ? (
    <div>
      <div className="contact-social">
        <ul>
          {!props.github || (
            <li className="social-media icons">
              <a
                className="github"
                href={props.github}
                target="_blank"
                rel="noopener nofollow">
                <i className="fa fa-github" />
              </a>
            </li>
          )}
          {!props.facebook || (
            <li className="social-media icons">
              <a
                className="facebook"
                href={props.facebook}
                target="_blank"
                rel="noopener nofollow">
                <i className="fa fa-facebook" />
              </a>
            </li>
          )}
          {!props.linkedin || (
            <li className="social-media icons">
              <a
                className="linkedin"
                href={props.linkedin}
                target="_blank"
                rel="noopener nofollow">
                <i className="fa fa-linkedin" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <div />
  );
}

SocialLinks.propTypes = {
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired
};

export default SocialLinks;
