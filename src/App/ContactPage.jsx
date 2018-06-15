import React from "react";


class ContactPage extends React.Component {
  render() {
    return (
      <section id="contact">
        <div className="container">
          <section className="hire">
            <div className="col-md-12">
              <div className="hire-wrapper">
                <h3>I'm available for freelance hire!</h3>
                <a className="smooth" href="#contact">
                  <i className="fa fa-envelope" /> Hire Me
                </a>
                <i className="fa fa-envelope-o" />
              </div>
            </div>
          </section>
          <div className="row">
            <div className="col-md-7">
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
                    />
                  </div>
                  <div className="group-them">
                    <i className="email-icon fa fa-envelope" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <textarea id="message" placeholder="Your Message" />
                  <div className="btn">
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
                  <span className="thin">Please Feel free to </span> Contact Me
                </h2>
                <div className="contact-info">
                  <p>
                    <i className="fa fa-map-marker" />{" "}
                    <strong>&nbsp; Address:</strong> 22 Place, Los Angelos
                  </p>
                </div>
                <div className="contact-info">
                  <p>
                    <i className="fa fa-phone" /> <strong>&nbsp; Phone:</strong>{" "}
                    002 123 345 789
                  </p>
                </div>
                <div className="contact-info">
                  <p>
                    <i className="fa fa-envelope" />{" "}
                    <strong>&nbsp; Email:</strong> johndoe@gmail.com
                  </p>
                </div>
                <div className="contact-social">
                  <ul>
                    <li className="social-media icons">
                      <a className="facebook" href="#" target="_blank">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li className="social-media icons text-center">
                      <a className="twitter" href="#" target="_blank">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li className="social-media icons">
                      <a className="google" href="#" target="_blank">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li className="social-media icons">
                      <a className="linkedin" href="#" target="_blank">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li className="social-media icons">
                      <a className="behance" href="#" target="_blank">
                        <i className="fa fa-behance" />
                      </a>
                    </li>
                    <li className="social-media icons">
                      <a className="dribbble" href="#" target="_blank">
                        <i className="fa fa-dribbble" />
                      </a>
                    </li>
                    <li className="social-media icons">
                      <a className="pinterest" href="#" target="_blank">
                        <i className="fa fa-pinterest" />
                      </a>
                    </li>
                  </ul>
                </div>
                <h3>Like Me on Facebook</h3>
                <div
                  className="fb-like"
                  data-href="#"
                  data-width="1000"
                  data-layout="button"
                  data-action="like"
                  data-size="small"
                  data-show-faces="false"
                  data-share="false"
                />
                <div id="map" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { ContactPage };
