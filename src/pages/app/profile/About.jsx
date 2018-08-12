import React from "react";
import PropTypes from "prop-types";
import UserProfile from "./about/UserProfile";

class About extends React.PureComponent {
  static propTypes = {
    profileContext: PropTypes.object.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  updateUserProfileValue = (name, value) => {
    this.props.profileContext.updateProfileValue(name, value);
  };

  render() {
    const { profile } = this.props.profileContext;
    if (!profile) {
      return <div>Loading...</div>;
    }

    return (
      <section id="about" className="container">
        <UserProfile
          profile={profile}
          canEdit={this.props.canEdit}
          updateUserProfileValue={this.updateUserProfileValue}
        />
      </section>
    );
  }
}

export { About };
