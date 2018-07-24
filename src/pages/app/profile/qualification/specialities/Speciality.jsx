import React from "react";
import PropTypes from "prop-types";
import Editable from "react-x-editable";
import ButtonRemove from "../../components/ButtonRemove";

export default class Skill extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number.isRequired,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  render() {
    const { data, index, canEdit } = this.props;

    if (!data && data === null) {
      return <div />;
    }

    return (
      <div className="single-speciality">
          <h3>
            <Editable
              name="value"
              index={index}
              dataType="text"
              disabled={!canEdit}
              value={data.value}
              placement="bottom"
              mode="popup"
              handleSubmit={newBlock =>
                this.props.editAction(
                  newBlock.props.index,
                  newBlock.props.name,
                  newBlock.newValue
                )
              }
            />
          </h3>
        <div className="skill-description">
          <Editable
            name="description"
            index={index}
            dataType="textarea"
            disabled={!canEdit}
            value={data.description}
            placement="bottom"
            mode="popup"
            handleSubmit={newBlock =>
              this.props.editAction(
                newBlock.props.index,
                newBlock.props.name,
                newBlock.newValue
              )
            }
          />
        </div>
        <div className="skill-bar">
          <div className="skill-percent" />
        </div>
        <ButtonRemove
          index={index}
          subclass="right relative"
          removeAction={() => this.props.removeAction(index)}
        />
        <hr />
      </div>
    );
  }
}
                