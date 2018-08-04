import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserProfile from "./about/UserProfile";
import { userActions } from "../../../actions";

class About extends React.PureComponent {
  updateUserProfileValue = (name, value) => {
    let { profile } = this.props;
    profile[name] = value;
    //todo uid
    this.props.dispatch(userActions.edit(profile));
  };

  render() {
    let { profile } = this.props;
    if (!profile) {
      return <div>Loading...</div>;
    }

    return (
      <section id="about">
        <div className="container">
          <UserProfile
            profile={profile}
            canEdit={this.props.canEdit}
            updateUserProfileValue={this.updateUserProfileValue}
          />
        </div>
      </section>
    );
  }
}

About.propTypes = {
  profile: PropTypes.object,
  canEdit: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedAbout = connect(mapDispatchToProps)(About);
export { connectedAbout as About };
