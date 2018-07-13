import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Editable from "react-x-editable";
import EditableRichField from "./components/EditableRichField"; 
import { userActions } from "../../actions";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  updateProfile = (editedField) => {
    console.log("AboutPage update");
    console.log(editedField);
    let { user } = this.props;
    user[editedField.state.name] = editedField.newValue;
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
    console.log("user in render");
    console.log(user);
    let canEditProfile = !true; // TODO check if thats current user
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
              <div>
                <a className="black-button" href="downloads/cv.pdf">
                  <i className="fa fa-download" />
                  Download CV
                </a>
              </div>
            </div>
            <div className="col-md-8">
              <div className="about-info">
                <h2>
                  <span>Hello I'm </span>
                  {user.lastName} {user.firstName}
                </h2>
                <div className="strong-p">
                  <Editable
                    name="title"
                    dataType="text"
                    disabled={canEditProfile}
                    value={user.title}
                    showButtons={false}
                    mode="inline"
                    handleSubmit={this.updateProfile}
                  />
                </div>
                <div>
                <Editable
                    name="description"
                    dataType="custom"
                    disabled={canEditProfile}
                    value={user.description}
                    showButtons={false}
                    mode="inline"
                    handleSubmit={this.updateProfile}
                    customComponent={(props, state) => { 
                      return ( 
                        <EditableRichField 
                          {...props} 
                          {...state} 
                        /> 
                      ); 
                    }} 
                  />         
                </div>
                <div className="info">
                  <div className="col-md-6 no-padding-left">
                    <ul>
                      <li>
                        <p className="info-title">Age </p>
                        <span className="info-details"> 28</span>
                      </li>
                      <li>
                        <p className="info-title">Address </p>
                        <span className="info-details">
                          {" "}
                          22 Place, Los Angelos
                        </span>
                      </li>
                      <li>
                        <p className="info-title">Email </p>
                        <span className="info-details">
                          {" "}
                          Johndoe@mywebsite.com
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 no-padding-left">
                    <ul>
                      <li>
                        <p className="info-title">Phone </p>
                        <span className="info-details"> +002 123 456 789</span>
                      </li>
                      <li>
                        <p className="info-title">Website </p>
                        <span className="info-details"> www.mywebsite.com</span>
                      </li>
                      <li>
                        <p className="info-title">Country </p>
                        <span className="info-details"> Australia</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 no-padding-left">
                    <ul>
                      <li className="social-media">
                        <p className="info-title">Social Links</p>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-google-plus" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-behance" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-dribbble" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-pinterest" />
                        </a>
                      </li>
                    </ul>
                  </div>
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
