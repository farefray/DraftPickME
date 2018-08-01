import React from 'react';
import { userService } from "@/services";

const SignOutButton = () =>
  <button
    type="button"
    className="btn btn-primary right"
    onClick={() => {
      userService.logout();
    }}
  >
    Sign Out
  </button>

export default SignOutButton;
