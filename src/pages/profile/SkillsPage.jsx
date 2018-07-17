import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editable from 'react-x-editable';
import { userActions } from '../../actions';

class SkillsPage extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;

    console.log('SkillsPage');
    this.state = {
      experience: user.experience
        ? user.experience
        : {
            skills: [
              {
                name: 'ReactJS',
                value: '6 months'
              },
              {
                name: 'VueJS',
                value: '1 year'
              },
              {
                name: 'PHP',
                value: '4 years'
              }
            ],
            language: [],
            jobs: [],
            specialities: [],
            hobbies: []
          },
      profileOwner: true // TODO check if thats current user
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      experience: PropTypes.array
    }),
    dispatch: PropTypes.func.isRequired
  };

  updateUserExperience = () => {
    let { user } = this.props;
    this.props.dispatch(userActions.edit(user));
  };

  render() {
    const { experience } = this.state;
    let skillPercent = {
      width: Math.floor(Math.random() * 31) + 50 + '%'
    };

    const disabledEditing = false;
    let SkillBlock = ({ data, index }) => {
      return (
        <div className="single-skill">
          <div className="skill-name">
            <Editable
              name="skill"
              index={index}
              dataType="text"
              disabled={disabledEditing}
              value={data.name}
              placement="bottom"
              mode="popup"
              handleSubmit={e => {
                console.log(e);
                console.log(this);
              }}
            />
          </div>
          <p className="percent">{data.value}</p>
          <div className="skill-bar">
            <div className="skill-percent" style={skillPercent} />
          </div>
        </div>
      );
    };

    let skillsBlockRender = experience.skills.map((blockData, index) => {
      return <SkillBlock key={index} index={index} data={blockData} />;
    });

    return (
      <section id="experience">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {experience && experience.skills && experience.skills.length ? (
                <div className="skills">
                  <h2>
                    <i className="fa fa-trophy" /> Main Skills
                  </h2>
                  {skillsBlockRender}
                </div>
              ) : (
                <div />
              )}

              <div className="skills margin-top">
                <h2>
                  <i className="fa fa-globe" /> Language Skills
                </h2>
                <div className="single-skill">
                  <p className="skill-name">English</p>
                  <p className="percent">100%</p>
                  <div className="skill-bar">
                    <div className="skill-percent" style={skillPercent} />
                  </div>
                </div>
                <div className="single-skill">
                  <p className="skill-name">Arabic</p>
                  <p className="percent">100%</p>
                  <div className="skill-bar">
                    <div className="skill-percent" style={skillPercent} />
                  </div>
                </div>
                <div className="single-skill">
                  <p className="skill-name">German</p>
                  <p className="percent">85%</p>
                  <div className="skill-bar">
                    <div className="skill-percent" style={skillPercent} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="jobs">
                <h2 className="special-margin">
                  {' '}
                  <i className="fa fa-briefcase" /> My Jobs
                </h2>
                <hr className="timeline" />
                <div className="single-job">
                  <div className="job-date">
                    <div className="job-circle" />
                    <p className="job-date-p">2010 - recent</p>
                  </div>
                  <div className="job-details">
                    <h3>Front End Developer</h3>
                    <div className="company">
                      <h3>Google</h3>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, sector adipiscing elit. quis
                      bibendum odio mattis vitae.
                    </p>
                  </div>
                </div>

                <div className="single-job">
                  <div className="job-date">
                    <div className="job-circle" />
                    <p className="job-date-p">2004 - 2010</p>
                  </div>
                  <div className="job-details">
                    <h3>Front End Developer</h3>
                    <div className="company">
                      <h3>FaceBook</h3>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, sector adipiscing elit. quis
                      bibendum odio mattis vitae.
                    </p>
                  </div>
                </div>

                <div className="single-job">
                  <div className="job-date">
                    <div className="job-circle" />
                    <p className="job-date-p">2000 - 2004</p>
                  </div>
                  <div className="job-details">
                    <h3>Front End Developer</h3>
                    <div className="company">
                      <h3>LinkedIn</h3>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, sector adipiscing elit. quis
                      bibendum odio mattis vitae.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="specialities">
                <h2>
                  <i className="fa fa-keyboard-o" /> My Specialities
                </h2>
                <div className="single-speciality">
                  <h3>Responsive Web</h3>
                  <p>modern and compatible with all devices.</p>
                </div>
                <hr />
                <div className="single-speciality">
                  <h3>Website Production</h3>
                  <p>modern and compatible with all devices.</p>
                </div>
                <hr />
                <div className="single-speciality">
                  <h3>Web Development</h3>
                  <p>modern and compatible with all devices.</p>
                </div>
                <hr />
              </div>
              <div className="hoppies margin-top">
                <h2>
                  <i className="fa fa-heart" /> My Hobbies
                </h2>
                <div className="col-md-4 text-center">
                  <div className="single-hobby">
                    <i className="fa fa-video-camera" />
                    <p>Photography</p>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="single-hobby">
                    <i className="zmdi zmdi-brush" />
                    <p>Paint</p>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="single-hobby">
                    <i className="fa fa-map" />
                    <p>Travel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);
const connectedSkillsPage = connect(mapDispatchToProps)(SkillsPage);
export { connectedSkillsPage as SkillsPage };
