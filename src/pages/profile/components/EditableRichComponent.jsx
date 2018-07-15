import React, { Component } from "react";
import PropTypes from "prop-types";
import Editable from "react-x-editable";
import DraftEditor from "./DraftEditor.jsx";
import RichTextRenderer from "./RichTextRenderer";

export default class EditableRichComponent extends Component {
  state = { 
    value: this.props.value,
    name: this.props.name,
  };

  handleSubmit = () => {
    console.log('submit')
    const {name, value} = this.state;
    this.props.onSubmit(name, value);
  }

  onChange = (newValue) => {
    let { value } = this.state;
    value = newValue;
    this.setState({ value });
    console.log('EditableRichComponent received on Change');
    console.log(this.state);
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
          console.log(value);
          return (<RichTextRenderer raw={value}/>);
        }}
        customComponent={(props, state) => {
          return <DraftEditor {...props} {...state} onChange={this.onChange} value={this.state.value}/>;
        }}
      />
    );
  }
}

EditableRichComponent.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
