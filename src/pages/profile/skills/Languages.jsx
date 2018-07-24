import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import Language from "./languages/Language";
import ButtonAdd from "../components/ButtonAdd";

export default class Languages extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

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

  editSingleBlockPart = (index, name, newValue) => {
    const { data } = this.state;
    data[index][name] = newValue;
    this.updateBlocks(data);
  };

  addNewBlock = () => {
    const { data } = this.state;
    data.push({
      value: "Language",
      percent: 'Beginner'
    });

    this.updateBlocks(data);
  };

  render() {
    const { data } = this.state;

    let noResults = !data || !data.length ? true : false;
    return (
      <div>
        <div className="skills languages margin-top">
        <h2>
            {noResults ? <div/> : <div className="animated fadeInDown"><i className="fa fa-globe" key="mainSkillsHeader"/> Languages</div>}
        </h2>
        <FlipMove>
            {data.map((blockData, index) => (
            <Language
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={blockData}
                removeAction={this.removeSingleBlockPart}
                editAction={this.editSingleBlockPart}
            />
            ))}
            <div key="buttonAddContainer"><ButtonAdd onClick={this.addNewBlock} entityName="language" key="addLanguages"/></div>
        </FlipMove>
        </div>
      </div>
    );
  }
}
