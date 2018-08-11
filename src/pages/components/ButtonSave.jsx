import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import PropTypes from "prop-types";

class ButtonSave extends React.Component {
  constructor(){
    super();
    this.state = {animationClass: 'flipInX'};
  }

  render() {
    const {animationClass} = this.state;

    return (<AwesomeButton
      type="primary"
      className={"save-button animated " + animationClass}
      size="large"
      action={() => {
        this.setState({animationClass: 'flipOutX'});
        setTimeout(() => {
          this.props.onClick();
        }, 1500);
      }}>
      Save
    </AwesomeButton>);
  }
}
          
ButtonSave.propTypes = {
  onClick: PropTypes.func.isRequired
}
export default ButtonSave;
