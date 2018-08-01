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
    //const user = { ...this.props.user };
    const {user} = this.props;

    this.state = {
      languages: user.languages || [],
      jobs: user.jobs || [],
      specialities: user.specialities || [],
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
  // TODO P1! The way current user is sent to props and saved is wrong, as we are actually mutating prop values in some cases.
  // Should be reworked into some other way, probably having current userprofile in redux, 
  // passing it with props, and dispatching edit actions on the later level components (skills, jobs, languages) wrapped into HOC
  // and those edit actions will change user and pass updates user state via props. And then, saving user profile from redux to database on action.
  updateUserProfile = () => {
    let { user } = this.props;
    user.languages = this.state.languages;
    user.jobs = this.state.jobs;
    user.specialities = this.state.specialities;
    this.props.dispatch(userActions.edit(user));
    this.setState({
      unsaved: false
    });
  };

  onChange = (name, value) => {
    console.log("onChange");
    console.log(name);
    console.log(value);
    console.log(this.state);
    let { unsaved } = this.state;
    unsaved = true;
    this.setState({
      unsaved
    });
  };

  render() {
    const { languages, specialities, jobs } = this.state;

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
      minHeight: '150px'
    }

    return (
      <section id="skills">
        <div className="container animated fadeInDown">
          <div className="row">
            {saveButton}
            <div className="col-md-4">
              <Skills
                data={this.props.skills || []}
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
            <div className="col-md-4" style={minHeight}>
              <Jobs
                data={jobs}
                canEdit={this.props.canEdit}
                name="jobs"
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-4">
              <Specialities
                data={specialities}
                canEdit={this.props.canEdit}
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
