import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import Language from "./languages/Language";
import ButtonAdd from "../components/ButtonAdd";

/*
  Ideally this should be merged with Skills and Specialities, as its nearly the same.
*/
export default class Languages extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      data: data
    };
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  removeLanguage = key => {
    let { data } = this.state;
    delete data[key];
    this.update(data);
  };

  update(data) {
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

  editLanguage = (index, name, newValue) => {
    const { data } = this.state;
    data[index][name] = newValue;
    this.update(data);
  };

  addLanguage = () => {
    const { data } = this.state;
    data.push({
      value: "Language",
      percent: "Beginner"
    });

    this.update(data);
  };

  render() {
    const { data } = this.state;

    let noResults = !data || !data.length ? true : false;
    return (
      <div>
        <div className="skills languages margin-top">
          <h2>
            {noResults ? (
              <div />
            ) : (
              <div>
                <i className="fa fa-globe" key="mainSkillsHeader" /> Languages
              </div>
            )}
          </h2>
          <FlipMove>
            {data.map((blockData, index) => (
              <Language
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={blockData}
                removeAction={this.removeLanguage}
                editAction={this.editLanguage}
              />
            ))}
            <div key="buttonAddContainer">
              {this.props.canEdit ? (
                <ButtonAdd
                  onClick={this.addLanguage}
                  entityName="language"
                  key="addLanguages"
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
