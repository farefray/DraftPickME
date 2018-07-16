import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

let educationBlock = (
  <div className="col-md-4">
    <div className="single-education">
      <div className="education-history text-center">
        <p>
          <i className="fa fa-graduation-cap" />
          <br /> 2014 - 2016
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacus
        tortor, quis bibendum odio mattis vitae. Cras porta massa pretium auctor
        congue. Suspendisse ante massa, euismod sit amet sem sed, viverra
        tristique diam.
      </p>
    </div>
  </div>
);

class EducationPage extends Component {
  state = {
    educationBlocks: []
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  addEducationBlock = () => {
    const { educationBlocks } = this.state;
    educationBlocks.push(educationBlock);
    this.setState({
      educationBlocks
    });
  }

  render() {
    let sectionStyle = {
      background: "url('/images/education.png') no-repeat top center fixed",
      backgroundSize: "cover",
      backgroundColor: "#fff",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    let canEditProfile = true; // TODO check if thats current user

    let educationBlocksRender = this.state.educationBlocks.map((block, key) => {
      console.log(key);
      return <div key={key}>{block}</div>;
    });

    let editEducation;
    if (canEditProfile && this.state.educationBlocks.length <= 5) {
      editEducation = (
        <div className="col-md-4">
          <button
            onClick={this.addEducationBlock}
            className="btn btn-primary">
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

const connectedEducationPage = connect(mapDispatchToProps)(EducationPage);
export { connectedEducationPage as EducationPage };
