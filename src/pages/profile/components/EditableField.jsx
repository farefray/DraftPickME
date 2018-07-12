import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, FormControl, HelpBlock } from "react-bootstrap";

export default class EditableField extends Component {
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
    this.props.onChanged(this.props.name, e.target.value);
    this.props.onSubmit();
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
      <FormGroup
        controlId="value"
        validationState={this.getValidationState()}
        key={"form-text-value"}
        name={"value"}>
        <FormControl
          key={"form-control-value"}
          type="text"
          bsSize="sm"
          value={this.state.value || ""}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
        <HelpBlock key={"HelpBlock" + this.props.name}>
          {this.state.validationError}
        </HelpBlock>
      </FormGroup>
    );
  }
}

EditableField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValueToAnchor: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChanged: PropTypes.func.isRequired
};
