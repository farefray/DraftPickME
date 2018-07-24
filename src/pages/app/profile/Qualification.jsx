import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import Skills from "./qualification/Skills";
import Languages from "./qualification/Languages";

class Qualification extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      skills: user.skills ? user.skills : [],
      languages: user.languages ? user.languages : [],
      jobs: user.jobs,
      specialities: user.specialities,
      unsaved: false
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      skills: PropTypes.array,
      languages: PropTypes.array,
      jobs: PropTypes.array,
      specialities: PropTypes.array
    }),
    canEdit: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  // Actually this can be moved to higher order component to keep it DRY
  updateUserProfile = (field, value) => {
    console.log("updating");
    console.log(field, value);
    let { user } = this.props;
    // todo update
    this.props.dispatch(userActions.edit(user));
  };

  onChange = (name, value) => {
    let { unsaved } = this.state;
    unsaved = true;
    this.setState({
      unsaved
    });
  };

  render() {
    const { skills, languages } = this.state;

    return (
      <section id="skills">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Skills
                data={skills}
                canEdit={this.props.canEdit}
                name="skills"
                onChange={this.onChange}
              />
              <Languages
                data={languages}
                canEdit={this.props.canEdit}
                name="languages"
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-4">
              <div className="jobs">
                <h2 className="special-margin">
                  {" "}
                  <i className="fa fa-briefcase" /> My Jobs
                </h2>
                <hr className="timeline" />
                <div className="single-job">
                  <div className="job-date">
                    <div className="job-circle" />
                    <p className="job-date-p">2010 - recent</p>
                  </div>
                  <div className="job-details">
                    <h3>Front End Developer</h3>
                    <div className="company">
                      <h3>Google</h3>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, sector adipiscing elit. quis
                      bibendum odio mattis vitae.
                    </p>
                  </div>
                </div>

                <div className="single-job">
                  <div className="job-date">
                    <div className="job-circle" />
                    <p className="job-date-p">2004 - 2010</p>
                  </div>
                  <div className="job-details">
                    <h3>Front End Developer</h3>
                    <div className="company">
                      <h3>FaceBook</h3>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, sector adipiscing elit. quis
                      bibendum odio mattis vitae.
                    </p>
                  </div>
                </div>

                <div className="single-job">
                  <div className="job-date">
                    <div className="job-circle" />
                    <p className="job-date-p">2000 - 2004</p>
                  </div>
                  <div className="job-details">
                    <h3>Front End Developer</h3>
                    <div className="company">
                      <h3>LinkedIn</h3>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, sector adipiscing elit. quis
                      bibendum odio mattis vitae.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="specialities">
                <h2>
                  <i className="fa fa-keyboard-o" /> My Specialities
                </h2>
                <div className="single-speciality">
                  <h3>Responsive Web</h3>
                  <p>modern and compatible with all devices.</p>
                </div>
                <hr />
                <div className="single-speciality">
                  <h3>Website Production</h3>
                  <p>modern and compatible with all devices.</p>
                </div>
                <hr />
                <div className="single-speciality">
                  <h3>Web Development</h3>
                  <p>modern and compatible with all devices.</p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);
const connectedQualification = connect(mapDispatchToProps)(Qualification);
export { connectedQualification as Qualification };
