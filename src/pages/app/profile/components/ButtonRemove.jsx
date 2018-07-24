import React from "react";
import PropTypes from "prop-types";

const ButtonRemove = ({ removeAction, index, subclass }) => {
  subclass = subclass ? subclass : "";
  return (
    <button className={"buttonRemove " + subclass} key={index}
    onClick={() => removeAction(index)}>
      <i className="fa fa-times" aria-hidden="true" />
    </button>
  );
};

ButtonRemove.propTypes = {
  removeAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  subclass: PropTypes.string
};

export default ButtonRemove;
