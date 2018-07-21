import React from "react";
import PropTypes from "prop-types";
import Editable from "react-x-editable";

export default class ProjectBlock extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number.isRequired,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired
  };

  render() {
    const { data, index } = this.props;
    const disabledEditing = false;

    if (!data && data === null) {
      return <div />;
    }

    return (
      <div className="col-md-4 project-block" key={index}>
        {!disabledEditing ? (
          <div
            className="projectRemove"
            key={index}
            onClick={() => this.props.removeAction(index)}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
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
              handleSubmit={e => this.props.editAction(e)}
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
                  handleSubmit={e => this.props.editAction(e)}
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
                  handleSubmit={e => this.props.editAction(e)}
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
              handleSubmit={e => this.props.editAction(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}
