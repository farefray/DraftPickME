import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../actions';

class ExperiencePage extends Component {
  constructor(props) {
    super(props);

    console.log('ExperiencePage');
    console.log(this.props.user.education);
    this.state = {
      educationBlocks: [],
      profileOwner: true // TODO check if thats current user
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      education: PropTypes.array
    }),
    dispatch: PropTypes.func.isRequired
  };

  updateUserEducation = () => {
    let { user } = this.props;
    user['education'] = this.state.educationBlocks;
    this.props.dispatch(userActions.edit(user));
  };

  removeEducationBlock = key => {
    let { educationBlocks } = this.state;

    educationBlocks = educationBlocks.filter(function(element) {
      return parseInt(element.key) !== key;
    });

    this.setState(
      {
        educationBlocks
      },
      () => {
        this.updateUserEducation();
      }
    );
  };

  addEducationBlock = () => {

    const { educationBlocks } = this.state;
    educationBlocks.push(
      this.educationBlock(this.state.profileOwner, educationBlocks.length)
    );
    
    this.setState(
      {
        educationBlocks
      },
      () => {
        this.updateUserEducation();
      }
    );
  };

  educationBlock = (canEdit, key) => (
    <div className="col-md-4" key={key}>
      {canEdit ? (
        <button
          className="educationRemove"
          key={key}
          onClick={() => this.removeEducationBlock(key)}
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
            <br /> {Math.random(0, 1) * 2018}
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
          pretium auctor congue. Suspendisse ante massa, euismod sit amet sem
          sed, viverra tristique diam.
        </p>
      </div>
    </div>
  );

  render() {
    let sectionStyle = {
      background: "url('/images/education.png') no-repeat top center fixed",
      backgroundSize: 'cover',
      backgroundColor: '#fff',
      backgroundBlendMode: 'overlay',
      height: '100%'
    };

    let educationBlocksRender = this.state.educationBlocks.map((block, key) => {
      return <div key={key}>{block}</div>;
    });

    let editEducation;
    if (this.state.profileOwner && this.state.educationBlocks.length <= 5) {
      editEducation = (
        <div className="col-md-4">
          <button onClick={this.addEducationBlock} className="btn btn-primary">
            Add my education
          </button>
        </div>
      );
    }

    return (
      <section id="education" style={sectionStyle}>
        <div className="container">
          <div className="row animated fadeInUp">
            <h2 className="none">Education</h2>
          </div>
          {educationBlocksRender}
          {editEducation}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);

const connectedExperiencePage = connect(mapDispatchToProps)(ExperiencePage);
export { connectedExperiencePage as ExperiencePage };
