import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import Job from "./jobs/Job";
import ButtonAdd from "../components/ButtonAdd";

export default class Jobs extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      jobs: data
    };
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  removeJob = key => {
    let { jobs } = this.state;
    delete jobs[key];
    this.update(jobs);
  };

  update(jobs) {
    this.setState({
      jobs
    });

    this.props.onChange(
      this.props.name,
      jobs.filter(block => {
        return block !== null;
      })
    );
  }

  editJob = (index, name, newValue) => {
    const { jobs } = this.state;
    jobs[index][name] = newValue;
    this.update(jobs);
  };

  addJob = () => {
    const { jobs } = this.state;
    jobs.push({
      date: "Dates",
      position: "Position",
      company: "Company",
      description: "Description"
    });

    this.update(jobs);
  };

  render() {
    const { jobs } = this.state;

    let noResults = !jobs || !jobs.length ? true : false;
    return (
      <div>
        <div className="jobs">
          {noResults ? (
            <div />
          ) : (
              <React.Fragment>
                <div>
                  <h2 className="special-margin">
                    {" "}
                    <i className="fa fa-briefcase" /> My Jobs
                  </h2>
                </div>
                <div className="timeline" />
              </React.Fragment>
            )}
          <FlipMove>
            {jobs.map((jobData, index) => (
              <Job
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={jobData}
                removeAction={this.removeJob}
                editAction={this.editJob}
              />
            ))}
            <div key="buttonAddContainer">
              <ButtonAdd onClick={this.addJob} entityName="job" />
            </div>
          </FlipMove>
        </div>
      </div>
    );
  }
}
