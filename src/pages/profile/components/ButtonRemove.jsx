import React from "react";
import PropTypes from "prop-types";

const ButtonRemove = ({ removeAction, index }) => {
  return (
    <button className="buttonRemove" key={index}
    onClick={() => removeAction(index)}>
      <i className="fa fa-times" aria-hidden="true" />
    </button>
  );
};

ButtonRemove.propTypes = {
  removeAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default ButtonRemove;
