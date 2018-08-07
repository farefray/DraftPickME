import React from "react";
import PropTypes from "prop-types";
import Editable from "@/libs/react-x-editable/dist/editable";
import ButtonRemove from "../../components/ButtonRemove";

export default class Language extends React.Component {
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

    const knowledgeOptions = [
      { value: 1, text: "Beginner", letter: 'A1' },
      { value: 2, text: "Elementary", letter: 'A2' },
      { value: 3, text: "Intermediate", letter: 'B1' },
      { value: 4, text: "Upper Intermediate", letter: 'B2' },
      { value: 5, text: "Advanced", letter: 'C1' },
      { value: 6, text: "Native", letter: 'C2' }
    ];
    let letterValue = knowledgeOptions.filter(opt => opt.text == data.percent)[0].letter;
    return (
      <div className="single-language">
        <div className="skill-name">
          <h3>
            <Editable
              name="value"
              index={index}
              dataType="text"
              disabled={!canEdit}
              value={data.value}
              placement="bottom"
              mode="popup"
              handleSubmit={newBlock => this.props.editAction(
                newBlock.props.index,
                newBlock.props.name,
                newBlock.newValue
              )
              }
            />
          </h3>
        </div>
        <div className="skill-power">
          {letterValue}
        </div>
        <div className="skill-description">
          <Editable
            name="percent"
            index={index}
            dataType="select"
            ignoreDefault={true}
            disabled={!canEdit}
            value={data.percent}
            placement="bottom"
            mode="popup"
            options={knowledgeOptions}
            handleSubmit={newBlock => this.props.editAction(
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
          subclass="left"
          removeAction={() => this.props.removeAction(index)}
        />
      </div>
    );
  }
}
