import React from 'react';
import { userService } from "@/services";
import { AwesomeButton } from "react-awesome-button";

const SignOutButton = () => {
  return (<AwesomeButton
    type="secondary"
    action={() => {
      userService.logout();
    }}>
    Sign Out
  </AwesomeButton>);
}
                    
export default SignOutButton;
