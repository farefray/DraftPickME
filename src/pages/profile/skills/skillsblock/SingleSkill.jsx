import React from "react";
import PropTypes from "prop-types";
import Editable from "react-x-editable";
import ButtonRemove from "../../components/ButtonRemove";

export default class SingleSkill extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number.isRequired,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  render() {
    const { data, index, canEdit } = this.props;
    const disabledEditing = !canEdit;

    if (!data && data === null) {
      return <div />;
    }

    return (
      <div className="single-skill">
        <ButtonRemove index={index}
            removeAction={() => this.props.removeAction(index)}/>
        <div className="skill-name">
          <Editable
            name="skill"
            index={index}
            dataType="text"
            disabled={disabledEditing}
            value={data.value}
            placement="bottom"
            mode="popup"
            handleSubmit={e => this.props.editAction(e)}
          />
        </div>
        <div className="percent">
          <Editable
            name="percent"
            index={index}
            dataType="text"
            disabled={disabledEditing}
            value={data.percent}
            placement="bottom"
            mode="popup"
            handleSubmit={e => this.props.editAction(e)}
          />
        </div>
        <div className="skill-bar">
          <div className="skill-percent" />
        </div>
      </div>
    );
  }
}
