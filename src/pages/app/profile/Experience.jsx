import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { userActions } from "../../../actions";
import Project from "./experience/Project";
import ButtonAdd from "./components/ButtonAdd";

class Experience extends Component {
  constructor(props) {
    super(props);

    const { profile } = this.props;
    this.state = {
      projectsBlocks: profile && profile.projects ? profile.projects : [],
      unsaved: false // todo probably warn about unsaved page on route and also move this to HOC
    };
  }

  static propTypes = {
    profile: PropTypes.shape({
      projects: PropTypes.array
    }).isRequired,
    canEdit: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  updateUserProjects = () => {
    let { profile } = this.props;
    let { projectsBlocks } = this.state;

    // removing null values from array, in order to save into db
    projectsBlocks = projectsBlocks.filter(project => {
      return project !== null;
    });

    profile["projects"] = projectsBlocks;
    this.setState({ unsaved: false });
    this.props.dispatch(userActions.editProfileValue('projects', projectsBlocks));
  };

  removeProject = key => {
    let { projectsBlocks } = this.state;
    delete projectsBlocks[key]; // such deleting creates 'null' record instead, but thats required for animation. Tho, we need to care about that null later.
    // projectsBlocks.splice(key, 1);
    this.setState({ projectsBlocks, unsaved: true });
  };

  addProject = () => {
    const { projectsBlocks } = this.state;
    // We can move this to fabric, TODO P3
    projectsBlocks.push({
      period: "Project time",
      name: "Project name",
      stack: "Tech stack",
      description: "Project description, specialities."
    });

    this.setState({
      projectsBlocks,
      unsaved: true
    });
  };

  editProject = newBlock => {
    const { projectsBlocks } = this.state;

    projectsBlocks[newBlock.props.index][newBlock.props.name] =
      newBlock.newValue;
    this.setState({
      projectsBlocks,
      unsaved: true
    });
  };

  render() {
    let addProjectButton =
      this.props.canEdit && this.state.projectsBlocks.length <= 15 ? (
        <ButtonAdd onClick={this.addProject}/>
      ) : (
        <div key="add_button" />
      );

    let saveButton = this.state.unsaved ? (
      <button className="actionButton animated fadeIn" onClick={this.updateUserProjects}>
        <i className="fa fa-check-circle-o" aria-hidden="true" />
        Save
      </button>
    ) : (
      <div key="save_button" />
    );

    const { projectsBlocks } = this.state;
    return (
      <div>
        <section id="experience">
          <div className="container animated fadeInDown">
            <FlipMove>
              {projectsBlocks.map((blockData, index) => (
                <Project
                  key={index}
                  index={index}
                  canEdit={this.props.canEdit}
                  data={blockData}
                  removeAction={this.removeProject}
                  editAction={this.editProject}
                />
              ))}
              <div className="col-md-4" key="project_buttons">
                {saveButton}
                {addProjectButton}
              </div>
            </FlipMove>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedExperience = connect(mapDispatchToProps)(Experience);
export { connectedExperience as Experience };
