import React, { Component } from "react";
import PropTypes from "prop-types";
import DraftEditor from "./DraftEditor.jsx";

export default class EditableRichField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : {},
      validationError: "" // TODO
    };
  }
  getValue = () => {
    return this.state.value;
  };
  onChange = ({ value }) => {
    console.log('value changed');
    console.log(value);
  }
  setValue = e => {
    let { value } = this.state;
    value = e.target.value;
    this.setState({ value });
    console.log(value);
    this.props.setValueToAnchor(value, e);
    console.log(this.props);
  };
  onBlur = e => {
    console.log("BLUR");
    console.log(e.target.value);
    //this.props.onChanged(this.props.name, e.target.value);
    this.props.onSubmit(e);
  };
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }
  render() {
    return (
      <DraftEditor
      />
    );
  }
}

EditableRichField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValueToAnchor: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
