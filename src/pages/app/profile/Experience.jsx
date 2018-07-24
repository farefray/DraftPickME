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

    const { user } = this.props;
    this.state = {
      projectsBlocks: user && user.projects ? user.projects : [],
      unsaved: false // todo probably warn about unsaved page on route and also move this to HOC
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      projects: PropTypes.array
    }),
    canEdit: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  updateUserProjects = () => {
    let { user } = this.props;
    let { projectsBlocks } = this.state;

    // removing null values from array, in order to save into db
    projectsBlocks = projectsBlocks.filter(project => {
      return project !== null;
    });
    user["projects"] = projectsBlocks;
    this.setState({ unsaved: false });
    this.props.dispatch(userActions.edit(user));
  };

  removeProject = key => {
    let { projectsBlocks } = this.state;
    delete projectsBlocks[key]; // such deleting creates 'null' record instead, but thats required for animation. Tho, we need to care about that null later.
    // projectsBlocks.splice(key, 1);
    this.setState({ projectsBlocks, unsaved: true });
  };

  addProject = () => {
    const { projectsBlocks } = this.state;
    projectsBlocks.push({
      period: "Project time",
      name: "Project name",
      stack: "Tech stack",
      description: "Project descrption, specialities."
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

    return (
      <div>
        <section id="experience">
          <div className="container animated fadeInDown">
            <FlipMove>
              {this.state.projectsBlocks.map((blockData, index) => (
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
