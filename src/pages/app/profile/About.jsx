import React from "react";
import PropTypes from "prop-types";
import UserProfile from "./about/UserProfile";

class About extends React.PureComponent {
  static propTypes = {
    profileContext: PropTypes.object.isRequired
  };

  updateUserProfileValue = (name, value) => {
    this.props.profileContext.updateProfileValue(name, value);
  };

  render() {
    let { profile } = this.props.profileContext;
    if (!profile) {
      return <div>Loading...</div>;
    }

    return (
      <section id="about" className="container">
        <UserProfile
          profile={profile}
          canEdit={this.props.profileContext.canEdit}
          updateUserProfileValue={this.updateUserProfileValue}
        />
      </section>
    );
  }
}

export { About };
