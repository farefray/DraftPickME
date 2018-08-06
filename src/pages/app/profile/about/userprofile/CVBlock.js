import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CVBlock = (props) => {
  return  props.cvFile && props.cvFile.path ? (
    <React.Fragment>
      <a
        className="black-button"
        href={props.cvFile.path}
        target="_blank"
        rel="noopener noreferrer">
        <i className="fa fa-download" />
        Download CV
      </a>
    </React.Fragment>
  ) : (
    <div>
      {props.canEdit ? (
        <React.Fragment>
        <Link
          to={"/p/" + props.username + "/edit"}
          className="black-button">
          Edit profile.
        </Link>
        </React.Fragment>
      ) : (
        <span />
      )}
    </div>
  )
}

CVBlock.propTypes = {
  username: PropTypes.string.isRequired,
  cvFile: PropTypes.shape({
    path: PropTypes.string.isRequired
  }),
  canEdit: PropTypes.bool.isRequired
};

export default CVBlock;
