import React from "react";
import PropTypes from "prop-types";

const ButtonAdd = ({ onClick, entityName }) => {
  return (
    <button onClick={onClick} className="actionButton">
      <i className="fa fa-plus-circle" aria-hidden="true" />
      Add {entityName ? " " + entityName : ""}
    </button>
  );
};

ButtonAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
  entityName: PropTypes.string
};

export default ButtonAdd;
