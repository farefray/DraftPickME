import React, { Component } from "react";
import PropTypes from "prop-types";
import DraftEditor from "./DraftEditor.jsx";

class EditableRichField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : '',
      validationError: "" // TODO
    };
  }

  getValue = () => {
    return this.state.value;
  };

  onChange = (newValue) => {
    console.log('rich value changed');
    console.log(newValue);
    // todo here we update state of current rich field
    let { value } = this.state;
    value = newValue;
    this.setState({ value });
  };

  handleSubmit = (e) => {
console.log('BLURRR')
  };

  setValue = e => {
    // todo seems its not working :)
    console.log('set value')
    let { value } = this.state;
    value = e.target.value;
    this.setState({ value });
    console.log(value);
    this.props.setValueToAnchor(value, e);
    console.log(this.props);
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
      <DraftEditor onChange={this.onChange} />
    );
  }
}

EditableRichField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValueToAnchor: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};


const higherOrderComponent = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent />;
    }
  }
    
  return HOC;
};
