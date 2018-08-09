import React from 'react';
import { AwesomeButton } from "react-awesome-button";

const SignOutButton = (props) => {
  return (<AwesomeButton
    type="primary"
    action={props.onClick}>
    Save
  </AwesomeButton>);
}
                    
export default SignOutButton;
