import React from "react";
import { connect } from "react-redux";

import { userActions } from "../actions";


class ExperiencePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    let sectionStyle = {
      background: "url('img/experience.png') no-repeat top center fixed",
      backgroundSize: "cover",
    }

		// Nikolay gonna love skill percents!
		let skillPercent = {
			width: Math.floor(Math.random() * 31) + 50 + '%'
		}

    return (
      <section id="experience" style={sectionStyle}>
			<div className="container">
				<div className="row">
					<div className="col-md-4 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="200">
						<div className="skills">
							<h2><i className="fa fa-trophy"></i> Main Skills</h2>
							<div className="single-skill">
								<p className="skill-name">HTML5</p>
								<p className="percent">100%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
							<div className="single-skill">
								<p className="skill-name">CSS3</p>
								<p className="percent">95%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
							<div className="single-skill">
								<p className="skill-name">JavaScript</p>
								<p className="percent">85%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
							<div className="single-skill">
								<p className="skill-name">JQuery</p>
								<p className="percent">90%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
						</div>
						<div className="skills margin-top">
							<h2><i className="fa fa-globe"></i> Language Skills</h2>
							<div className="single-skill">
								<p className="skill-name">English</p>
								<p className="percent">100%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
							<div className="single-skill">
								<p className="skill-name">Arabic</p>
								<p className="percent">100%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
							<div className="single-skill">
								<p className="skill-name">German</p>
								<p className="percent">85%</p>
								<div className="skill-bar">
									<div className="skill-percent" style={skillPercent}></div>
								</div>
							</div>
						</div>
					</div>
					
					<div className="col-md-4 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.6s" data-wow-offset="200">
						<div className="jobs">
							<h2 className="special-margin"> <i className="fa fa-briefcase"></i> My Jobs</h2>
							<hr className="timeline"/>
							<div className="single-job">
								<div className="job-date">
									<div className="job-circle"></div>
									<p className="job-date-p">2010 - recent</p>
								</div>
								<div className="job-details">
									<h3>Front End Developer</h3>
                                    <div className="company">
										<h3>Google</h3>
									</div>
									<p>
										Lorem ipsum dolor sit amet, sector adipiscing elit. quis bibendum odio mattis vitae.
									</p>
								</div>
							</div>
							
							<div className="single-job">
								<div className="job-date">
									<div className="job-circle"></div>
									<p className="job-date-p">2004 - 2010</p>
								</div>
								<div className="job-details">
									<h3>Front End Developer</h3>
                                    <div className="company">
										<h3>FaceBook</h3>
									</div>
									<p>
										Lorem ipsum dolor sit amet, sector adipiscing elit. quis bibendum odio mattis vitae.
									</p>
								</div>
							</div>
							
							<div className="single-job">
								<div className="job-date">
									<div className="job-circle"></div>
									<p className="job-date-p">2000 - 2004</p>
								</div>
								<div className="job-details">
									<h3>Front End Developer</h3>
										<div className="company">
										<h3>LinkedIn</h3>
									</div>
									<p>
										Lorem ipsum dolor sit amet, sector adipiscing elit. quis bibendum odio mattis vitae.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.8s" data-wow-offset="200">
						<div className="specialities">
							<h2><i className="fa fa-keyboard-o"></i> My Specialities</h2> 
							<div className="single-speciality">
								<h3>Responsive Web</h3>
								<p>modern and compatible with all devices.</p>
							</div>
							<hr/>
							<div className="single-speciality">
								<h3>Website Production</h3>
								<p>modern and compatible with all devices.</p>
							</div>
							<hr/>
							<div className="single-speciality">
								<h3>Web Development</h3>
								<p>modern and compatible with all devices.</p>
							</div>
							<hr/>
						</div>
						<div className="hoppies margin-top">
							<h2><i className="fa fa-heart"></i> My Hobbies</h2>
							<div className="col-md-4 text-center">
								<div className="single-hobby">
									<i className="fa fa-video-camera"></i>
									<p>Photography</p>
								</div>
							</div>
							<div className="col-md-4 text-center">
								<div className="single-hobby">
									<i className="zmdi zmdi-brush"></i>
									<p>Paint</p>
								</div>
							</div>
							<div className="col-md-4 text-center">
								<div className="single-hobby">
									<i className="fa fa-map"></i>
									<p>Travel</p>
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

const connectedExperiencePage = connect(mapStateToProps)(ExperiencePage);
export { connectedExperiencePage as ExperiencePage };
