import React from "react";
import PropTypes from "prop-types";
import SocialLinks from "./contact/SocialLinks";
import { userService } from "@/services";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.fullNameField = React.createRef();
    this.messageField = React.createRef();
    this.emailField = React.createRef();

    this.state = {
      contactData: {
        email: "",
        fullName: "",
        message: ""
      },
      contacted: false
    };
  }

  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  focusContactForm = event => {
    event.preventDefault();
    this.fullNameField.current.value = "Your potencial rabotodatel";
    this.messageField.current.value =
      "Hello! We could hire you, are you still interested? [Julz gonna write some attractive text example here ;)]";
    this.emailField.current.focus();
  };

  submitContactForm = e => {
    e.preventDefault();
    const { contactData } = this.state;
    const { profile } = this.props;
    userService.contactUser(profile.email, contactData);
    this.setState({ contacted: true });
  };

  render() {
    const { profile } = this.props;
    const { contacted } = this.state;
    return (
      <section id="contact">
        <div className="container">
          <section className="row hire">
            <div className="col-md-12">
              <div className="hire-wrapper">
                <h3>I'm available for hire!</h3>
                {!contacted ? (
                  <a
                    className="smooth"
                    href="#contact"
                    onClick={this.focusContactForm}>
                    <i className="fa fa-envelope" /> Hire Me
                  </a>
                ) : (
                  <div />
                )}
                <i className="fa fa-envelope-o" />
              </div>
            </div>
          </section>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-7 contact-form-container">
                <h2>Get In touch</h2>
                <hr className="contact-hr" />
                {contacted ? (
                  <React.Fragment>
                    {" "}
                    <h3>Thanks for contacting {profile.username}!</h3>
                  </React.Fragment>
                ) : (
                  <div className="contact-form">
                    <form method="post">
                      <div className="group-them">
                        <i className="user-icon fa fa-user-plus" />
                        <input
                          id="fullname"
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          ref={this.fullNameField}
                          onChange={e => {
                            const { contactData } = this.state;
                            contactData.fullName = e.target.value;
                            this.setState({ contactData });
                          }}
                        />
                      </div>
                      <div className="group-them">
                        <i className="email-icon fa fa-envelope" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Email"
                          ref={this.emailField}
                          onChange={e => {
                            const { contactData } = this.state;
                            contactData.email = e.target.value;
                            this.setState({ contactData });
                          }}
                        />
                      </div>
                      <textarea
                        id="message"
                        placeholder="Your Message"
                        ref={this.messageField}
                        onChange={e => {
                          const { contactData } = this.state;
                          contactData.message = e.target.value;
                          this.setState({ contactData });
                        }}
                      />
                      <div className="btn" onClick={this.submitContactForm}>
                        <span>
                          <i className="fa fa-location-arrow" /> Send Message
                        </span>
                      </div>
                    </form>
                  </div>
                )}
                <div id="response_brought" />
                <p>&nbsp;</p>
              </div>
              <div className="col-md-5 right-section">
                <div className="contact-card flipInY">
                  <h2>Contact Me</h2>
                  {!profile.phone || (
                    <div className="contact-info">
                      <p>
                        <i className="fa fa-phone" />{" "}
                        <strong>&nbsp; Phone:</strong> {profile.phone}
                      </p>
                    </div>
                  )}
                  {!profile.email || (
                    <div className="contact-info">
                      <p>
                        <i className="fa fa-envelope" />{" "}
                        <strong>&nbsp; Email:</strong>{" "}
                        <a href={"mailto:" + profile.email}>{profile.email}</a>
                      </p>
                    </div>
                  )}
                  <SocialLinks
                    github={profile.github}
                    facebook={profile.facebook}
                    linkedin={profile.linkedin}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { Contact };
