import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Editable from "react-x-editable";
import { userActions } from "../../actions";
import classNames from "classnames";

class ProjectBlock extends React.Component {
  state = { 
    removing: this.props.data.removing ? this.props.data.removing : false
  };
  
  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    removeAction: PropTypes.func
  };

  render() {
    const { data, index } = this.props;
    const disabledEditing = false;

    let blockClasses = classNames('col-md-4', 'project-block', 'animated', { fadeIn: this.state.removing, fadeOut: this.state.removing })
    return (
      <div className={blockClasses} key={index}>
        {!disabledEditing ? (
          <div
            className="projectRemove"
            key={index}
            onClick={() => this.props.removeAction(index)}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
        ) : (
          ""
        )}
        <div className="single-project">
          <div className="project-history text-center">
            <div>
              <i className="fa fa-calendar-o" />
              {index}
            </div>
            <Editable
              name="period"
              index={index}
              dataType="text"
              disabled={disabledEditing}
              value={data.period}
              placement="bottom"
              mode="popup"
              handleSubmit={e => this.props.removeAction(e)}
            />
          </div>
          <div className="degree">
            <ul>
              <li>
                <i className="fa fa-file-text" />
                <Editable
                  name="name"
                  index={index}
                  dataType="text"
                  disabled={disabledEditing}
                  value={data.name}
                  placement="bottom"
                  mode="popup"
                  handleSubmit={e => this.props.removeAction(e)}
                />
              </li>
              <li>
                <i className="fa fa-stack-overflow" />
                <Editable
                  name="stack"
                  index={index}
                  dataType="text"
                  disabled={disabledEditing}
                  value={data.stack}
                  mode="popup"
                  handleSubmit={e => this.props.removeAction(e)}
                />
              </li>
            </ul>
          </div>
          <div className="project-description">
            <Editable
              name="description"
              index={index}
              dataType="textarea"
              disabled={disabledEditing}
              value={data.description}
              mode="popup"
              handleSubmit={e => this.props.removeAction(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ExperiencePage extends Component {
  constructor(props) {
    super(props);

    console.log("ExperiencePage");
    console.log(this.props.user.projects);
    const { user } = this.props;
    this.state = {
      projectsBlocks: user && user.projects ? user.projects : [],
      profileOwner: true // TODO check if thats current user
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      projects: PropTypes.array
    }),
    dispatch: PropTypes.func.isRequired
  };

  updateUserProjects = () => {
    let { user } = this.props;
    user["projects"] = this.state.projectsBlocks;
    this.props.dispatch(userActions.edit(user));
  };

  removeProjectBlock = key => {
    let { projectsBlocks } = this.state;

    console.log("remove block " + key);
    console.log(projectsBlocks);
    projectsBlocks[key].removing = true;
    projectsBlocks.splice(key, 1);
    // TOdo
    console.log(projectsBlocks);

    this.setState(
      {
        projectsBlocks
      },
      () => {
        this.updateUserProjects();
      }
    );
  };

  addProjectBlock = () => {
    const { projectsBlocks } = this.state;
    projectsBlocks.push({
      period: "1 year",
      name: "CRM",
      stack: "PHP",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam."
    });

    this.setState(
      {
        projectsBlocks
      },
      () => {
        this.updateUserProjects();
      }
    );
  };

  editProjectBlock = newBlock => {
    const { projectsBlocks } = this.state;
    projectsBlocks[newBlock.props.index][newBlock.props.name] =
      newBlock.newValue;
    this.setState(
      {
        projectsBlocks
      },
      () => {
        this.updateUserProjects();
      }
    );
  };

  render() {
    let addNewProjectBlock =
      this.state.profileOwner && this.state.projectsBlocks.length <= 5 ? (
        <div className="col-md-4">
          <button onClick={this.addProjectBlock} id="project_add_button">
            <i className="fa fa-plus-square-o" aria-hidden="true" />
          </button>
        </div>
      ) : (
        ""
      );

    let projectsBlocksRender = this.state.projectsBlocks.map(
      (blockData, index) => {
        console.log(blockData);
        return (
          <ProjectBlock
            key={index}
            index={index}
            data={blockData}
            removeAction={this.removeProjectBlock}
          />
        );
      }
    );

    return (
      <section id="experience">
        <div className="container">
          <div className="row animated fadeInUp">
            <h2 className="none">Projects</h2>
          </div>
          {projectsBlocksRender}
          {addNewProjectBlock}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedExperiencePage = connect(mapDispatchToProps)(ExperiencePage);
export { connectedExperiencePage as ExperiencePage };
