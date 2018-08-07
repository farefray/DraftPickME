import React from "react";
import PropTypes from "prop-types";
import Editable from "@/../react-x-editable/dist/editable";
import ButtonRemove from "../../components/ButtonRemove";
import StarRatingComponent from "react-star-rating-component";

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
      <div className="single-skill">
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
        <div className="skill-power">
          <StarRatingComponent
            editing={canEdit}
            name={"" + index}
            starCount={5}
            value={data.power}
            renderStarIcon={(index, value) => {
              return (
                <span>
                  <i
                    className={index <= value ? "fa fa-star" : "fa fa-star-o"}
                  />
                </span>
              );
            }}
            onStarClick={(newValue, oldValue, index) => {
              this.props.editAction(index, "power", newValue);
            }}
          />
        </div>
        <div className="skill-description">
          <Editable
            name="percent"
            index={index}
            dataType="textarea"
            disabled={!canEdit}
            value={data.percent}
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
          subclass="left"
          removeAction={() => this.props.removeAction(index)}
        />
      </div>
    );
  }
}
