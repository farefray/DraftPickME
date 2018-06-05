import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../actions";


class AboutPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    let sectionStyle = {
      background: "url('img/about.png') no-repeat top center fixed",
      backgroundSize: "cover",
    }

    return (
      <section id="about" style={sectionStyle}>
			<div className="container">
				<div className="row wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="200">
					<div className="col-md-4">
						<div className="profile-img">
							<img className="img-responsive" alt="profile-img" src="http://placehold.it/270x340"/>
						</div>
						<div>
							<a className="white-button" href="downloads/cv.pdf">
								<i className="fa fa-download"></i>
								Download CV
							</a>
						</div>
					</div>
					<div className="col-md-8">
						<div className="about-info">
							<h2><span>Hello I'm </span>John Doe</h2>
							<p className="strong-p">
								I'm John Doe. Creative Web
										Designer And Developer With More
										Than 5 Years Experience. I Design
										Your Website.
							</p>
							<p>
								whereas multidisciplinary intellectual capital. Distinctively synergize market-driven master and prospective channels. Dramatically drive an expanded array of expertise with modern technology. Completely cultivate standardized manufactured.
                            	Continue transform process centric systems rather than compelling growth strategies. Energistically streamline low-risk high-yield supply chains via scalable intellectual capital.
							</p>
							<div className="info">
								<div className="col-md-6 no-padding-left">
									<ul>
										<li>
											<p className="info-title">Age </p>
											<span className="info-details"> 28</span>
										</li>
										<li>
											<p className="info-title">Address </p>
											<span className="info-details"> 22 Place, Los Angelos</span>
										</li>
										<li>
											<p className="info-title">Email </p>
											<span className="info-details"> Johndoe@mywebsite.com</span>
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
											<a href="#" target="_blank"><i className="fa fa-facebook"></i></a>
										</li>
										<li className="social-media icons">
											<a href="#" target="_blank"><i className="fa fa-twitter"></i></a>
										</li>
										<li className="social-media icons">
											<a href="#" target="_blank"><i className="fa fa-google-plus"></i></a>
										</li>
										<li className="social-media icons">
											<a href="#" target="_blank"><i className="fa fa-linkedin"></i></a>
										</li>
										<li className="social-media icons">
											<a href="#" target="_blank"><i className="fa fa-behance"></i></a>
										</li>
										<li className="social-media icons">
											<a href="#" target="_blank"><i className="fa fa-dribbble"></i></a>
										</li>
										<li className="social-media icons">
											<a href="#" target="_blank"><i className="fa fa-pinterest"></i></a>
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

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedAboutPage = connect(mapStateToProps)(AboutPage);
export { connectedAboutPage as AboutPage };
