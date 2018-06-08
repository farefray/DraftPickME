import React from "react";
import { connect } from "react-redux";

import { userActions } from "../actions";


class ContactPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {

    return (
		<section id="contact">
		<div className="container">
		<section className="hire">
			<div className="col-md-12">
					<div className="hire-wrapper">
						<h3>I'm available for freelance hire!</h3>
						<a className="smooth" href="#contact"><i className="fa fa-envelope"></i> Hire Me</a>
						<i className="fa fa-envelope-o"></i>
					</div>
			</div>
			</section>
			<div className='row'>
				<div className="col-md-7">
					<h2>Get In touch</h2> 
					<hr className="contact-hr"/>
					<div className="contact-form">
						<form method="post">
							<div className="group-them">
								<i className="user-icon fa fa-user-plus"></i>
								<input id="fullname" type="text" name="username" placeholder="Username"/>
							</div>
							<div className="group-them">
								<i className="email-icon fa fa-envelope"></i>
								<input id="email" type="email" name="email" placeholder="Email"/>
							</div>
							<textarea id="message" placeholder="Your Message"></textarea>
							<div onclick="submit_form();" className="btn">
								<span><i className="fa fa-location-arrow"></i> Send Message</span>
							</div>
						</form>
					</div>		
					<div id="response_brought"></div>
					<p>&nbsp;</p>
				</div>
				<div className="col-md-5 right-section">
					<div className="contact-card wow flipInY" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="200">
						<h2><span className="thin">Please Feel free to </span> Contact Me</h2>
						<div className="contact-info">
							<p><i className="fa fa-map-marker"></i> <strong>&nbsp; Address:</strong> 22 Place, Los Angelos</p>
						</div>
						<div className="contact-info">
							<p><i className="fa fa-phone"></i> <strong>&nbsp; Phone:</strong> 002 123 345 789</p>
						</div>
						<div className="contact-info">
							<p><i className="fa fa-envelope"></i> <strong>&nbsp; Email:</strong> johndoe@gmail.com</p>
						</div>
						<div className="contact-social">
							<ul>
								<li className="social-media icons">
									<a className="facebook" href="#" target="_blank"><i className="fa fa-facebook"></i></a>
								</li>
								<li className="social-media icons text-center">
									<a className="twitter" href="#" target="_blank"><i className="fa fa-twitter"></i></a>
								</li>
								<li className="social-media icons">
									<a  className="google" href="#" target="_blank"><i className="fa fa-google-plus"></i></a>
								</li>
								<li  className="social-media icons">
									<a className="linkedin" href="#" target="_blank"><i className="fa fa-linkedin"></i></a>
								</li>
								<li className="social-media icons">
									<a className="behance" href="#" target="_blank"><i className="fa fa-behance"></i></a>
								</li>
								<li className="social-media icons">
									<a className="dribbble" href="#" target="_blank"><i className="fa fa-dribbble"></i></a>
								</li>
								<li className="social-media icons">
									<a className="pinterest" href="#" target="_blank"><i className="fa fa-pinterest"></i></a>
								</li>
							</ul>
						</div>
						<h3>Like Me on Facebook</h3>
						<div className="fb-like" data-href="https://www.facebook.com/yahyaessamthemeforest" data-width="1000" data-layout="button" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
						<div id="map"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedContactPage = connect(mapStateToProps)(ContactPage);
export { connectedContactPage as ContactPage };
