import React from "react";
import PropTypes from "prop-types";
import Editable from "react-x-editable";
import ButtonRemove from "../../components/ButtonRemove";

export default class Job extends React.Component {
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
      <div className="single-job">
        <div className="job-date">
          <div className="job-circle" />
          <div className="job-date-p">
            <Editable
              name="date"
              index={index}
              dataType="text"
              disabled={!canEdit}
              value={data.date}
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
        </div>
        <div className="job-details">
          <h3>
            <Editable
              name="position"
              index={index}
              dataType="text"
              disabled={!canEdit}
              value={data.position}
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
          <div className="company">
            <h3>
              <Editable
                name="company"
                index={index}
                dataType="text"
                disabled={!canEdit}
                value={data.company}
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
          </div>
          <div>
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
        </div>
        <ButtonRemove
          index={index}
          subclass="right relative"
          removeAction={() => this.props.removeAction(index)}
        />
      </div>
    );
  }
}
