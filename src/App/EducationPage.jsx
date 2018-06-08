import React from "react";
import { connect } from "react-redux";

import { userActions } from "../actions";


class EducationPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    let sectionStyle = {
      background: "url('img/education.png') no-repeat top center fixed",
      backgroundSize: "cover",
    }

    return (
      <section id="education" style={sectionStyle}>
			<div className="container">
				<div className="row wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="200">
					<h2 className="none">Education</h2>
					<div className="col-md-4">
						<div className="single-education">
							<div className="education-history text-center">
								<p><i className="fa fa-graduation-cap"></i><br/> 2014 - 2016</p>
							</div>
							<div className="degree"> 
								<ul>
									<li><i className="fa fa-file-text"></i> Software Engneering</li>
									<li><i className="fa fa-university"></i> Oxford University</li>
								</ul>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.
							</p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="single-education">
							<div className="education-history text-center">
								<p><i className="fa fa-graduation-cap"></i><br/> 2012 - 2014</p>
							</div>
							<div className="degree"> 
								<ul>
									<li><i className="fa fa-file-text"></i> Software Engneering</li>
									<li><i className="fa fa-university"></i> Oxford University</li>
								</ul>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.
							</p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="single-education">
							<div className="education-history text-center">
								<p><i className="fa fa-graduation-cap"></i><br/> 2010 - 2012</p>
							</div>
							<div className="degree"> 
								<ul>
									<li><i className="fa fa-file-text"></i> Software Engneering</li>
									<li><i className="fa fa-university"></i> Oxford University</li>
								</ul>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.
							</p>
						</div>
					</div>
					
					<div className="col-md-4">
						<div className="single-education">
							<div className="education-history text-center">
								<p><i className="fa fa-graduation-cap"></i><br/> 2008 - 2010</p>
							</div>
							<div className="degree"> 
								<ul>
									<li><i className="fa fa-file-text"></i> Software Engneering</li>
									<li><i className="fa fa-university"></i> Oxford University</li>
								</ul>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.
							</p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="single-education">
							<div className="education-history text-center">
								<p><i className="fa fa-graduation-cap"></i><br/>> 2004 - 2008</p>
							</div>
							<div className="degree"> 
								<ul>
									<li><i className="fa fa-file-text"></i> Software Engneering</li>
									<li><i className="fa fa-university"></i> Oxford University</li>
								</ul>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.
							</p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="single-education">
							<div className="education-history text-center">
								<p><i className="fa fa-graduation-cap"></i><br/>> 2000 - 2004</p>
							</div>
							<div className="degree"> 
								<ul>
									<li><i className="fa fa-file-text"></i> Software Engneering</li>
									<li><i className="fa fa-university"></i> Oxford University</li>
								</ul>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.
							</p>
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

const connectedEducationPage = connect(mapStateToProps)(EducationPage);
export { connectedEducationPage as EducationPage };
