import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import EditableRichComponent from "../../../components/EditableRichComponent";

export default class UserProfile extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      description: PropTypes.any,
      age: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
      country: PropTypes.string,
      email: PropTypes.string,
      cvFile: PropTypes.string
    }).isRequired,
    updateUserProfileValue: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  render() {
    const { user, canEdit } = this.props;
    const disabledEditing = !canEdit;

    let socialLinksBlock =
      user.github || user.facebook || user.linkedin ? (
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
        {canEdit ? (
          <Link to={"/editprofile"} className="black-button">
            Edit profile.
          </Link>
        ) : (
          <span />
        )}
      </div>
    );

    return (
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
                disabled={disabledEditing}
                value={user.title}
                placement="bottom"
                mode="popup"
                handleSubmit={this.props.updateUserProfileValue}
              />
            </div>
            <hr />
            <div class="editable-rich-container">
              <EditableRichComponent
                name="description"
                disabled={disabledEditing}
                value={user.description}
                defaultValue="Describe your profile more detailed."
                handleSubmit={(name, newValue) => {
                  return this.props.updateUserProfileValue(
                    name,
                    newValue
                  );
                }}
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
                        disabled={disabledEditing}
                        value={user.age ? user.age : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={this.props.updateUserProfileValue}
                      />
                    </span>
                  </li>
                  <li>
                    <p className="info-title">Address </p>
                    <span className="info-details">
                      <Editable
                        name="address"
                        dataType="text"
                        disabled={disabledEditing}
                        value={user.address ? user.adress : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={this.props.updateUserProfileValue}
                      />
                    </span>
                  </li>
                  <li>
                    <p className="info-title">Email </p>
                    <span className="info-details">
                      <Editable
                        name="email"
                        dataType="text"
                        disabled={disabledEditing}
                        value={user.email ? user.email : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={this.props.updateUserProfileValue}
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
                        disabled={disabledEditing}
                        value={user.phone ? user.phone : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={this.props.updateUserProfileValue}
                      />
                    </span>
                  </li>
                  <li>
                    <p className="info-title">Website </p>
                    <span className="info-details">
                      <Editable
                        name="website"
                        dataType="text"
                        disabled={disabledEditing}
                        value={user.website ? user.website : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={this.props.updateUserProfileValue}
                      />
                    </span>
                  </li>
                  <li>
                    <p className="info-title">Country </p>
                    <span className="info-details">
                      <Editable
                        name="country"
                        dataType="text"
                        disabled={disabledEditing}
                        value={user.country ? user.country : "-"}
                        placement="bottom"
                        mode="popup"
                        handleSubmit={this.props.updateUserProfileValue}
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
    );
  }
}
