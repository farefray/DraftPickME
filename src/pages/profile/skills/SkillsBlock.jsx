import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import SingleSkill from "./skillsblock/SingleSkill";
import ButtonAdd from "../components/ButtonAdd";

export default class SkillsBlock extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    console.log("SkillsBlock");
    this.state = {
      data: data
    };
  }

  static propTypes = {
    data: PropTypes.array,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  removeSingleBlockPart = key => {
    let { data } = this.state;
    delete data[key]; // such deleting creates 'null' record instead, but thats required for animation. Tho, we need to care about that null later.
    // projectsBlocks.splice(key, 1);
    this.updateBlocks(data);
  };

  updateBlocks(data) {
    this.setState({
      data
    });

    this.props.onChange(
      this.props.name,
      data.filter(block => {
        return block !== null;
      })
    );
  }

  editSingleBlockPart = newBlock => {
    const { data } = this.state;

    data[newBlock.props.index][newBlock.props.name] = newBlock.newValue;
    this.updateBlocks(data);
  };

  addNewBlock = () => {
    const { data } = this.state;
    data.push({
      value: "Skill name",
      percent: "period",
      power: "3"
    });

    this.updateBlocks(data);
  };

  render() {
    const { data } = this.state;

    let noResults = !data || !data.length ? true : false;
    return (
      <div>
        <div className="skills">
        <h2>
            {noResults ? <div/> : <div className="animated fadeInDown"><i className="fa fa-trophy" key="mainSkillsHeader"/> Main Skills</div>}
        </h2>
        <FlipMove>
            {data.map((blockData, index) => (
            <SingleSkill
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={blockData}
                removeAction={this.removeSingleBlockPart}
                editAction={this.editSingleBlockPart}
            />
            ))}
            <div key="buttonAddContainer"><ButtonAdd onClick={this.addNewBlock} entityName="skill"/></div>
        </FlipMove>
        </div>
      </div>
    );
  }
}
