import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import Speciality from "./specialities/Speciality";
import ButtonAdd from "../components/ButtonAdd";

export default class Specialities extends React.Component {
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

  removeSpeciality = key => {
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

  editSpeciality = (index, name, newValue) => {
    const { data } = this.state;
    data[index][name] = newValue;
    this.update(data);
  };

  addSpeciality = () => {
    const { data } = this.state;
    data.push({
      value: "Speciality",
      description: 'Speciality description'
    });

    this.update(data);
  };

  render() {
    const { data } = this.state;

    let noResults = !data || !data.length ? true : false;
    return (
      <div>
        <div className="specialities">
        <h2>
            {noResults ? <div/> : <div className="animated fadeInDown"><h2><i className="fa fa-keyboard-o" /> My Specialities</h2></div>}
        </h2>
        <FlipMove>
            {data.map((blockData, index) => (
            <Speciality
                key={index}
                index={index}
                canEdit={this.props.canEdit}
                data={blockData}
                removeAction={this.removeSpeciality}
                editAction={this.editSpeciality}
            />
            ))}
            <div key="buttonAddContainer"><ButtonAdd onClick={this.addSpeciality} entityName="speciality"/></div>
        </FlipMove>
        </div>
      </div>
    );
  }
}