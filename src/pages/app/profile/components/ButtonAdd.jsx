import React from "react";
import { AwesomeButton } from "react-awesome-button";
import PropTypes from "prop-types";

class ButtonAdd extends React.PureComponent {
  render() {
    const { entityName, onClick } = this.props;
    return (
      <AwesomeButton
        type="primary"
        className={"add-button animated flipInX"}
        size="tiny"
        action={onClick}>
        <i className="fa fa-plus-circle" aria-hidden="true" />
        Add {!entityName || " " + entityName}
      </AwesomeButton>
    );
  }
}

ButtonAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
  entityName: PropTypes.string
};
export default ButtonAdd;
