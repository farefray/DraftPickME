import React from "react";
import PropTypes from "prop-types";
import SocialLinks from "./contact/SocialLinks";
import classNames from "classnames";
import { userService } from "@/services";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.emailField = React.createRef();

    this.state = {
      contactData: {
        email: "",
        fullName: "",
        message: ""
      },
      contacted: false,
      hireMeClicked: false,
      contactDone: false
    };
  }

  static propTypes = {
    profileContext: PropTypes.object.isRequired
  };

  focusContactForm = event => {
    event.preventDefault();
    this.emailField.current.focus();
    this.setState({ hireMeClicked: true });
  };

  contactFormReady = () => {
    const { contactData } = this.state;
    if (!contactData.email || !contactData.fullName || !contactData.message) {
      return false;
    }

    return true;
  };
  submitContactForm = e => {
    e.preventDefault();
    if (!this.contactFormReady()) {
      return;
    }

    const { contactData } = this.state;
    const { profile } = this.props.profileContext;
    userService.contactUser(profile.email, contactData);
    this.setState({ contacted: true });
    setTimeout(() => {
      this.setState({ contactDone: true });
    }, 500);
  };

  render() {
    const { profile } = this.props.profileContext;
    const { contacted, hireMeClicked, contactDone } = this.state;
    return (
      <section id="contact">
        <section className="hire animated fadeIn">
          <div className="hire-wrapper">
            <h3>I'm available for hire!</h3>
            <a
              href="#contact"
              onClick={this.focusContactForm}
              className={classNames({ "animated hinge": hireMeClicked })}>
              <i className="fa fa-envelope" /> Hire Me
            </a>
            <i className="fa fa-envelope-o" />
          </div>
        </section>
        <div className="contact-me animated fadeIn">
          <div className={classNames("contact-form-container", {
                  "contacted": contacted
                })}>
            <h2>Get In touch</h2>
            <hr className="contact-hr" />
            {contactDone ? (
              <div className="contact-done animated zoomIn"><h3>Thanks for contacting me!</h3></div>
            ) : (
              <div
                className={classNames("contact-form", {
                  "animated zoomOut": contacted
                })}>
                <form method="post">
                  <div
                    className={classNames("group-them", {
                      "animated shake": hireMeClicked
                    })}>
                    <i className="user-icon fa fa-user-plus" />
                    <input
                      id="fullname"
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      onChange={e => {
                        let { contactData } = this.state;
                        contactData.fullName = e.target.value;
                        this.setState({ contactData });
                      }}
                    />
                  </div>
                  <div
                    className={classNames("group-them", {
                      "animated shake": hireMeClicked
                    })}>
                    <i className="email-icon fa fa-envelope" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={this.emailField}
                      onChange={e => {
                        let { contactData } = this.state;
                        contactData.email = e.target.value;
                        this.setState({ contactData });
                      }}
                    />
                  </div>
                  <textarea
                    id="message"
                    className={classNames({ "animated shake": hireMeClicked })}
                    placeholder="Your Message"
                    onChange={e => {
                      let { contactData } = this.state;
                      contactData.message = e.target.value;
                      this.setState({ contactData });
                    }}
                  />
                  <div
                    className={classNames("btn", {
                      disabled: !this.contactFormReady()
                    })}
                    onClick={this.submitContactForm}>
                    <span>
                      <i className="fa fa-location-arrow" /> Send Message
                    </span>
                  </div>
                </form>
              </div>
            )}

            <div id="response_brought" />
          </div>
          <div className="right-section">
            <div className="contact-card flipInY">
              <h2>Contact Me</h2>
              {!profile.phone || (
                <div className="contact-info">
                  <p>
                    <i className="fa fa-phone" /> <strong>&nbsp; Phone:</strong>{" "}
                    {profile.phone}
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
      </section>
    );
  }
}

export { Contact };
