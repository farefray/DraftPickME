import React from "react";

export const ProfileContext = React.createContext({
    profile: null,
    canEdit: false,
    updateProfile: () => {} 
});


export function withProfile(Component) {
  return function ComponentWithProfile(props) {
    return <ProfileContext.Consumer>
        {profileContext => <Component {...props} profileContext={profileContext} />}
      </ProfileContext.Consumer>;
  };
}
