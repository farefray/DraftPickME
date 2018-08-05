import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import Skills from "./qualification/Skills";
import Languages from "./qualification/Languages";
import Specialities from "./qualification/Specialities";
import Jobs from "./qualification/Jobs";

class Qualification extends Component {
  constructor(props) {
    super(props);
    let { qualification } = this.props.profile;

    this.state = {
      qualification: {
        skills:
          qualification && qualification.skills ? qualification.skills : [],
        languages:
          qualification && qualification.languages
            ? qualification.languages
            : [],
        jobs: qualification && qualification.jobs ? qualification.jobs : [],
        specialities:
          qualification && qualification.specialities
            ? qualification.specialities
            : []
      },
      unsaved: false
    };
  }

  static propTypes = {
    profile: PropTypes.shape({
      qualification: PropTypes.shape({
        skills: PropTypes.array,
        languages: PropTypes.array,
        jobs: PropTypes.array,
        specialities: PropTypes.array
      })
    }).isRequired,
    canEdit: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  // Actually this can be moved to higher order component to keep it DRY
  // TODO P1! The way current user is sent to props and saved is wrong, as we are actually mutating prop values in some cases.
  // Should be reworked into some other way, probably having current userprofile in redux,
  // passing it with props, and dispatching edit actions on the later level components (skills, jobs, languages) wrapped into HOC
  // and those edit actions will change user and pass updates user state via props. And then, saving user profile from redux to database on action.
  updateUserProfile = () => {
    let { qualification } = this.props.profile;
    qualification = { ...this.state.qualification };
    this.props.dispatch(
      userActions.editProfileValue("qualification", qualification)
    );

    this.setState({
      unsaved: false
    });
  };

  onChange = (name, value) => {
    // P0 TODO - thats actually can be skipped, as we actually mutating our props in child components :( this should be reworked.
    console.log("onChange");
    const { qualification } = this.state;
    qualification[name] = value;
    this.setState({
      qualification: qualification,
      unsaved: true
    });
  };

  render() {
    const { languages, specialities, jobs, skills } = this.state.qualification;

    let saveButton = this.state.unsaved ? (
      <button
        className="actionButton animated fadeIn"
        onClick={this.updateUserProfile}>
        <i className="fa fa-check-circle-o" aria-hidden="true" />
        Save
      </button>
    ) : (
      <div key="save_button" />
    );

    const minHeight = {
      minHeight: "150px"
    };

    const { canEdit } = this.props;
    return (
      <section id="skills">
        <div className="container animated fadeInDown">
          <div className="row">
            {saveButton}
            <div className="col-md-4">
              <Skills
                data={skills}
                canEdit={canEdit}
                name="skills"
                onChange={this.onChange}
              />
              <Languages
                data={languages}
                canEdit={canEdit}
                name="languages"
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-4" style={minHeight}>
              <Jobs
                data={jobs}
                canEdit={canEdit}
                name="jobs"
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-4">
              <Specialities
                data={specialities}
                canEdit={canEdit}
                name="specialities"
                onChange={this.onChange}
              />
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
