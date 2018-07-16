import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import EditableRichComponent from "../../components/EditableRichComponent";
import { userActions } from "../../actions";

class AboutPage extends React.PureComponent {
  updateProfileValue = editedField => {
    this.updateUserProfile(editedField.state.name, editedField.newValue);
  };

  updateUserProfile = (name, value) => {
    let { user } = this.props;
    user[name] = value;
    this.props.dispatch(userActions.edit(user));
  };

  render() {
    let sectionStyle = {
      background: "url('/images/about.png') no-repeat top center fixed",
      backgroundSize: "cover",
      backgroundColor: "#e6e6e6",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    let { user } = this.props; // TODO make default values for fields which are available on this page
    let canEditProfile = !true; // TODO check if thats current user
    if (!user.id) {
      return <div>Loading...</div>;
    }

    let hasSocials = () => {
      console.log(user.github || user.facebook || user.linkedin);
      return user.github || user.facebook || user.linkedin;
    };

    let socialLinksBlock = hasSocials() ? (
      <div>
        <div className="col-md-12 no-padding-left">
          <ul>
            <li className="social-media">
              <p className="info-title">Social Links</p>
            </li>
            {user.github ? (
              <li className="social-media icons">
                <a href={user.github} target="_blank" rel="noopener">
                  <i className="fa fa-github" />
                </a>
              </li>
            ) : (
              ""
            )}
            {user.linkedin ? (
              <li className="social-media icons">
                <a href={user.linkedin} target="_blank" rel="noopener">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
            ) : (
              ""
            )}
            {user.facebook ? (
              <li className="social-media icons">
                <a href={user.facebook} target="_blank" rel="noopener">
                  <i className="fa fa-facebook" />
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    ) : (
      <div />
    );

    const CVBlock = user.cvFile ? (
      <div>
        <a className="black-button" href={user.cvFile}>
          <i className="fa fa-download" />
          Download CV
        </a>
      </div>
    ) : (
      <div>
        <Link to={"/editprofile"} className="black-button">
          Edit profile.
        </Link>
      </div>
    );

    return (
      <section id="about" style={sectionStyle}>
        <div className="container">
          <div className="row animated fadeInUp">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  className="img-responsive"
                  alt="profile-img"
                  src="http://placehold.it/270x340"
                />
              </div>
              {CVBlock}
            </div>
            <div className="col-md-8">
              <div className="about-info">
                <h2>
                  {user.lastName} {user.firstName}
                </h2>
                <div className="strong-p">
                  <Editable
                    name="title"
                    dataType="text"
                    disabled={canEditProfile}
                    value={user.title}
                    placement="bottom"
                    mode="popup"
                    handleSubmit={this.updateProfileValue}
                  />
                </div>
                <hr />
                <div>
                  <EditableRichComponent
                    name="description"
                    disabled={canEditProfile}
                    value={user.description}
                    defaultValue="Describe your profile more detailed."
                    handleSubmit={this.updateUserProfile}
                  />
                </div>
                <div className="info">
                  <div className="col-md-6 no-padding-left">
                    <ul>
                      <li>
                        <p className="info-title">Age </p>
                        <span className="info-details">
                          <Editable
                            name="age"
                            dataType="text"
                            disabled={canEditProfile}
                            value={user.age ? user.age : "-"}
                            placement="bottom"
                            mode="popup"
                            handleSubmit={this.updateProfileValue}
                          />
                        </span>
                      </li>
                      <li>
                        <p className="info-title">Address </p>
                        <span className="info-details">
                          <Editable
                            name="address"
                            dataType="text"
                            disabled={canEditProfile}
                            value={user.address ? user.adress : "-"}
                            placement="bottom"
                            mode="popup"
                            handleSubmit={this.updateProfileValue}
                          />
                        </span>
                      </li>
                      <li>
                        <p className="info-title">Email </p>
                        <span className="info-details">
                          <Editable
                            name="email"
                            dataType="text"
                            disabled={canEditProfile}
                            value={user.email ? user.email : "-"}
                            placement="bottom"
                            mode="popup"
                            handleSubmit={this.updateProfileValue}
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 no-padding-left">
                    <ul>
                      <li>
                        <p className="info-title">Phone </p>
                        <span className="info-details">
                          <Editable
                            name="phone"
                            dataType="text"
                            disabled={canEditProfile}
                            value={user.phone ? user.phone : "-"}
                            placement="bottom"
                            mode="popup"
                            handleSubmit={this.updateProfileValue}
                          />
                        </span>
                      </li>
                      <li>
                        <p className="info-title">Website </p>
                        <span className="info-details">
                          <Editable
                            name="website"
                            dataType="text"
                            disabled={canEditProfile}
                            value={user.website ? user.website : "-"}
                            placement="bottom"
                            mode="popup"
                            handleSubmit={this.updateProfileValue}
                          />
                        </span>
                      </li>
                      <li>
                        <p className="info-title">Country </p>
                        <span className="info-details">
                          <Editable
                            name="country"
                            dataType="text"
                            disabled={canEditProfile}
                            value={user.country ? user.country : "-"}
                            placement="bottom"
                            mode="popup"
                            handleSubmit={this.updateProfileValue}
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                  {socialLinksBlock}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AboutPage.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedAboutPage = connect(mapDispatchToProps)(AboutPage);
export { connectedAboutPage as AboutPage };
