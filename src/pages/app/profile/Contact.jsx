import React from "react";
import PropTypes from "prop-types";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.usernameField = React.createRef();
    this.messageField = React.createRef();
    this.emailField = React.createRef();
  }
  
  static propTypes = {
    user: PropTypes.shape({
      projects: PropTypes.array
    })
  };

  focusContactForm = () => {
    this.usernameField.current.value = "Your potencial rabotodatel";
    this.messageField.current.value = "Hello! We could hire you, are you still interested?";
    this.emailField.current.focus(); //todo fixme
  }

  submitContactForm = () => {
    alert('todo');
  }

  render() {
    const { user } = this.props;
    console.log(user);
    let socialLinksBlock =
      (user.github || user.facebook || user.linkedin) ? (
        <div>
          <div className="contact-social">
            <ul>
              {!user.github || <li className="social-media icons">
                <a className="github" href={user.github} target="_blank" rel="noopener nofollow">
                  <i className="fa fa-github" />
                </a>
              </li>}
              {!user.facebook || <li className="social-media icons">
                <a className="facebook" href={user.facebook} target="_blank" rel="noopener nofollow">
                  <i className="fa fa-facebook" />
                </a>
              </li>}
              {!user.linkedin || <li className="social-media icons">
                <a className="linkedin" href={user.linkedin} target="_blank" rel="noopener nofollow">
                  <i className="fa fa-linkedin" />
                </a>
              </li>}
            </ul>
          </div>
        </div>
      ) : (
          <div />
        );

    return (
      <section id="contact">
        <div className="container">
          <section className="hire">
            <div className="col-md-12">
              <div className="hire-wrapper">
                <h3>I'm available for hire!</h3>
                <a className="smooth" href="#contact" onClick={this.focusContactForm}>
                  <i className="fa fa-envelope" /> Hire Me
                </a>
                <i className="fa fa-envelope-o" />
              </div>
            </div>
          </section>
          <div className="row">
            <div className="col-md-7 contact-form-container">
              <h2>Get In touch</h2>
              <hr className="contact-hr" />
              <div className="contact-form">
                <form method="post">
                  <div className="group-them">
                    <i className="user-icon fa fa-user-plus" />
                    <input
                      id="fullname"
                      type="text"
                      name="username"
                      placeholder="Username"
                      ref={this.usernameField}
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
                    />
                  </div>
                  <textarea id="message" placeholder="Your Message" ref={this.messageField} />
                  <div className="btn" onClick={() => this.submitContactForm}>
                    <span>
                      <i className="fa fa-location-arrow" /> Send Message
                    </span>
                  </div>
                </form>
              </div>
              <div id="response_brought" />
              <p>&nbsp;</p>
            </div>
            <div className="col-md-5 right-section">
              <div className="contact-card flipInY">
                <h2>
                  Contact Me
                </h2>
                {!user.phone || <div className="contact-info">
                  <p>
                    <i className="fa fa-phone" /> <strong>&nbsp; Phone:</strong>{" "}
                    {user.phone}
                  </p>
                </div>}
                {!user.email || <div className="contact-info">
                  <p>
                    <i className="fa fa-envelope" />{" "}
                    <strong>&nbsp; Email:</strong> {user.email}
                  </p>
                </div>}
                {socialLinksBlock}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { Contact };
