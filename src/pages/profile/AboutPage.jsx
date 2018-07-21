import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserProfile from "./about/UserProfile";
import { userActions } from "../../actions";

class AboutPage extends React.PureComponent {
  updateUserProfileValue = (name, value) => {
    let { user } = this.props;
    user[name] = value;
    this.props.dispatch(userActions.edit(user));
  };

  render() {
    let { user } = this.props;
    if (!user || !user.id) {
      return <div>Loading...</div>;
    }

    return (
      <section id="about">
        <div className="container">
          <UserProfile
            user={user}
            canEdit={this.props.canEdit}
            updateUserProfileValue={this.updateUserProfileValue}
          />
        </div>
      </section>
    );
  }
}

AboutPage.propTypes = {
  user: PropTypes.object,
  canEdit: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedAboutPage = connect(mapDispatchToProps)(AboutPage);
export { connectedAboutPage as AboutPage };
