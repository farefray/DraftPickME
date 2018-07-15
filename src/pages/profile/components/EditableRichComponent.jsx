import React, { Component } from "react";
import PropTypes from "prop-types";
import Editable from "react-x-editable";
import RichTextEditor from "./RichTextEditor.jsx";
import RichTextRenderer from "./RichTextRenderer";

export default class EditableRichComponent extends Component {
  state = { 
    value: this.props.value,
    name: this.props.name,
  };

  handleSubmit = () => {
    const {name, value} = this.state;
    this.props.handleSubmit(name, value);
  }

  onRichFieldEdited = (newValue) => {
    let { value } = this.state;
    value = newValue;
    this.setState({ value });
  }

  render() {
    return (
      <Editable
        name="description"
        dataType="custom"
        disabled={this.props.disabled}
        value={this.state.value}
        handleSubmit={this.handleSubmit}
        display={(value) => {
          return (<RichTextRenderer raw={value}/>);
        }}
        customComponent={(props, state) => {
          return <RichTextEditor {...props} {...state} onChange={this.onRichFieldEdited} value={this.state.value}/>;
        }}
      />
    );
  }
}

EditableRichComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};
