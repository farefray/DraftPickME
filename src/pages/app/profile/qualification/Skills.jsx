import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import Skill from "./skills/Skill";
import ButtonAdd from "../components/ButtonAdd";

export default class Skills extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  removeSkill = key => {
    let { data } = this.props;
    // TODO P0 - if deleted, then array is not anymore an object and it bugs
    delete data[key];
    this.update(data);
  };

  update(data) {
    this.props.onChange(this.props.name, data);
  }

  editSkill = (index, name, newValue) => {
    let { data } = this.props;
    data[index][name] = newValue;
    this.update(data);
  };

  addSkill = () => {
    let { data } = this.props;
    // TODO P3 make a fabric for this
    data.push({
      value: "Skill name",
      percent: "Optional description",
      power: 3
    });
    data = data.filter(block => {
      return block && block !== null;
    });
    this.update(data);
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className="skills">
          <h2>
            {data.length > 0 ? (
              <div>
                <i className="fa fa-trophy" key="mainSkillsHeader" /> Main
                Skills
              </div>
            ) : (
              <div />
            )}
          </h2>
          <FlipMove>
            {data.map((data, index) => (
              <Skill
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={data}
                removeAction={this.removeSkill}
                editAction={this.editSkill}
              />
            ))}
            <div key="buttonAddContainer">
              {this.props.canEdit ? (
                <ButtonAdd
                  onClick={this.addSkill}
                  entityName="skill"
                  key="addSkills"
                />
              ) : (
                <div />
              )}
            </div>
          </FlipMove>
        </div>
      </div>
    );
  }
}
