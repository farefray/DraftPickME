import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editable from 'react-x-editable';
import { userActions } from '../../actions';

class ExperiencePage extends Component {
  constructor(props) {
    super(props);

    console.log('ExperiencePage');
    console.log(this.props.user.projects);
    this.state = {
      projectsBlocks: [],
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
    user['projects'] = this.state.projectsBlocks;
    this.props.dispatch(userActions.edit(user));
  };

  removeProjectBlock = key => {
    let { projectsBlocks } = this.state;

    projectsBlocks = projectsBlocks.filter(function(element) {
      return parseInt(element.key) !== key;
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

  addProjectBlock = () => {
    const { projectsBlocks } = this.state;
    projectsBlocks.push(
      {
        'period': '1 year',
        'name': 'CRM',
        'stack': 'PHP',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor congue. Suspendisse ante massa, euismod sit amet sem sed, viverra tristique diam.'
      }
    );

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
    let sectionStyle = {
      background: "url('/images/education.png') no-repeat top center fixed",
      backgroundSize: 'cover',
      backgroundColor: '#fff',
      backgroundBlendMode: 'overlay',
      height: '100%'
    };

    let editProject;
    if (this.state.profileOwner && this.state.projectsBlocks.length <= 5) {
      editProject = (
        <div className="col-md-4">
          <button onClick={this.addProjectBlock} className="btn btn-primary">
            Add project
          </button>
        </div>
      );
    }

    const disabledEditing = false;
    let ProjectBlock = ({ data, index }) => {
      return (
        <div className="col-md-4" key={index}>
          {!disabledEditing ? (
            <button
              className="projectRemove"
              key={index}
              onClick={() => this.removeProjecteBlock(index)}
            >
              Remove
            </button>
          ) : (
            ''
          )}
          <div className="single-education">
            <div className="education-history text-center">
              <p>
                <i className="fa fa-graduation-cap" />
                <br />
                <Editable
                  name="skill"
                  index={index}
                  dataType="text"
                  disabled={disabledEditing}
                  value={data.period}
                  placement="bottom"
                  mode="popup"
                  handleSubmit={e => {
                    console.log(e);
                    console.log(this);
                  }}
                />
              </p>
            </div>
            <div className="degree">
              <ul>
                <li>
                  <i className="fa fa-file-text" /> Software Engneering
                </li>
                <li>
                  <i className="fa fa-university" /> Oxford University
                </li>
              </ul>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper
              lacus tortor, quis bibendum odio mattis vitae. Cras porta massa
              pretium auctor congue. Suspendisse ante massa, euismod sit amet
              sem sed, viverra tristique diam.
            </p>
          </div>
        </div>
      );
    };

    let projectsBlocksRender = this.state.projectsBlocks.map((blockData, index) => {
      console.log(blockData);
      return <ProjectBlock key={index} index={index} data={blockData} />;
    });

    return (
      <section id="education" style={sectionStyle}>
        <div className="container">
          <div className="row animated fadeInUp">
            <h2 className="none">Education</h2>
          </div>
          {projectsBlocksRender}
          {editProject}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedExperiencePage = connect(mapDispatchToProps)(ExperiencePage);
export { connectedExperiencePage as ExperiencePage };
