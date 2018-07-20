import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Editable from "react-x-editable";
import { userActions } from "../../actions";
import { TransitionGroup, Transition } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0, height: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

const FadeTransition = ({ children, in: inProp }) => (
  <Transition
    in={inProp}
    timeout={duration}
    unmountOnExit={true}
    mountOnEnter={true}>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
        {children}
      </div>
    )}
  </Transition>
);

FadeTransition.propTypes = {
  children: PropTypes.object.isRequired,
  in: PropTypes.any
};

class ProjectBlock extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number.isRequired,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired
  };

  render() {
    const { data, index } = this.props;
    const disabledEditing = false;

    if(!data && data === null) {
      return <div/>;
    }

    return (
      <div className="col-md-4 project-block animated fadeInDown" key={index}>
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
            </div>
            <Editable
              name="period"
              index={index}
              dataType="text"
              disabled={disabledEditing}
              value={data.period}
              placement="bottom"
              mode="popup"
              handleSubmit={e => this.props.editAction(e)}
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
                  handleSubmit={e => this.props.editAction(e)}
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
                  handleSubmit={e => this.props.editAction(e)}
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
              handleSubmit={e => this.props.editAction(e)}
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
      unsaved: false,
      profileOwner: true // TODO check if thats current user
    };

    console.log(this.state);
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
    this.setState({ unsaved: false });
    this.props.dispatch(userActions.edit(user));
  };

  removeProjectBlock = key => {
    let { projectsBlocks } = this.state;
    delete projectsBlocks[key];
    // projectsBlocks.splice(key, 1); 
    this.setState({ projectsBlocks, unsaved: true });
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

    this.setState({
      projectsBlocks,
      unsaved: true
    });
  };

  editProjectBlock = newBlock => {
    console.log(newBlock);
    const { projectsBlocks } = this.state;
    console.log(projectsBlocks);

    projectsBlocks[newBlock.props.index][newBlock.props.name] =
      newBlock.newValue;
    this.setState({
      projectsBlocks,
      unsaved: true
    });
  };

  render() {
    let addNewProjectBlock =
      this.state.profileOwner && this.state.projectsBlocks.length <= 15 ? (
        <div className="col-md-4">
          <button onClick={this.addProjectBlock} id="project_add_button">
            <i className="fa fa-plus-square-o" aria-hidden="true" />
          </button>
          {this.state.unsaved ? (
            <button
              onClick={this.updateUserProjects}
              className="btn btn-success">
              Save
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      );

    return (
      <section id="experience">
        <div className="container">
          <TransitionGroup>
            {this.state.projectsBlocks.map((blockData, index) => (
              <FadeTransition key={index}>
                <ProjectBlock
                  key={index}
                  index={index}
                  data={blockData}
                  removeAction={this.removeProjectBlock}
                  editAction={this.editProjectBlock}
                />
              </FadeTransition>
            ))}
          </TransitionGroup>

          {addNewProjectBlock}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedExperiencePage = connect(mapDispatchToProps)(ExperiencePage);
export { connectedExperiencePage as ExperiencePage };
