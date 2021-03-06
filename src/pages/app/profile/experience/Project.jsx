import React from "react";
import PropTypes from "prop-types";
import Editable from "@/../react-x-editable/dist/editable";
import ButtonRemove from "../components/ButtonRemove";

export default class Project extends React.PureComponent {
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
      <div className="col-md-4 project-block" key={index}>
        {!disabledEditing ? (
          <ButtonRemove
            index={index}
            removeAction={() => this.props.removeAction(index)}/>
        ) : (
          ""
        )}
        <div className="single-project">
          <div className="project-history text-center">
            <div>
              <i className="fa fa-calendar-o" />
            </div>
            <Editable
              name="period"
              index={index}
              dataType="text"
              disabled={disabledEditing}
              value={data.period}
              placement="bottom"
              mode="popup"
              handleSubmit={this.props.editAction}
            />
          </div>
          <div className="degree">
            <ul>
              <li>
                <i className="fa fa-file-text" />
                <Editable
                  name="name"
                  index={index}
                  dataType="text"
                  disabled={disabledEditing}
                  value={data.name}
                  placement="bottom"
                  mode="popup"
                  handleSubmit={this.props.editAction}
                />
              </li>
              <li>
                <i className="fa fa-stack-overflow" />
                <Editable
                  name="stack"
                  index={index}
                  dataType="text"
                  disabled={disabledEditing}
                  value={data.stack}
                  mode="popup"
                  handleSubmit={this.props.editAction}
                />
              </li>
            </ul>
          </div>
          <div className="project-description">
            <Editable
              name="description"
              index={index}
              dataType="textarea"
              disabled={disabledEditing}
              value={data.description}
              mode="popup"
              handleSubmit={this.props.editAction}
            />
          </div>
        </div>
      </div>
    );
  }
}
