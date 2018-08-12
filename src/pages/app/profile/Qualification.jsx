import React from "react";
import PropTypes from "prop-types";
import Skills from "./qualification/Skills";
import Languages from "./qualification/Languages";
import Specialities from "./qualification/Specialities";
import Jobs from "./qualification/Jobs";
import ButtonSave from "@/pages/components/ButtonSave";
import _ from "lodash";

class Qualification extends React.Component {
  constructor(props) {
    super(props);
    let { qualification } = this.props.profileContext.profile;
    if (qualification) {
      qualification = _.cloneDeep(qualification); // avoiding mutating of profile which is in context. Todo better way - P3
    } else {
      qualification = {};
    }

    this.state = {
      qualification: {
        skills: qualification.skills || [],
        languages: qualification.languages || [],
        jobs: qualification.jobs || [],
        specialities: qualification.specialities || []
      },
      unsaved: false
    };
  }

  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    profileContext: PropTypes.shape({
      profile: PropTypes.shape({
        qualification: PropTypes.shape({
          skills: PropTypes.array,
          languages: PropTypes.array,
          jobs: PropTypes.array,
          specialities: PropTypes.array
        })
      }),
      updateProfileValue: PropTypes.func.isRequired
    }).isRequired
  };

  // Actually this can be moved to higher order component to keep it DRY
  updateUserProfile = () => {
    this.setState(
      {
        unsaved: false
      },
      () => {
        let { qualification } = this.props.profileContext.profile;
        qualification = { ...this.state.qualification };
        this.props.profileContext.updateProfileValue(
          "qualification",
          qualification
        );
      }
    );
  };

  onChange = (name, value) => {
    let { qualification } = this.state;
    qualification[name] = value;
    this.setState({
      qualification: qualification,
      unsaved: true
    });
  };

  render() {
    const { languages, specialities, jobs, skills } = this.state.qualification;
    const { canEdit } = this.props;
    return (
      <section id="skills" className="container animated fadeIn">
        {!this.state.unsaved || <ButtonSave onClick={this.updateUserProfile} />}
        <div className="skills-and-languages-block">
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
        <div className="jobs-block">
          <Jobs
            data={jobs}
            canEdit={canEdit}
            name="jobs"
            onChange={this.onChange}
          />
        </div>
        <div className="specialities-block">
          <Specialities
            data={specialities}
            canEdit={canEdit}
            name="specialities"
            onChange={this.onChange}
          />
        </div>
      </section>
    );
  }
}

export { Qualification };
