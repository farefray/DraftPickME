import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { hideAlert } from "../actions";

class Alert extends React.Component {
  render() {
    return (
      <li
        className={`alert animated quick alert-${this.props.type} ${
          this.props.animationClass
        }`}
        onClick={this.props.onDismissClick}
      >
        <p className="alert__content">{this.props.text}</p>
      </li>
    );
  }
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  animationClass: PropTypes.string.isRequired
};

const Alerts = ({ actions, alerts }) => {
  const { hideAlert } = actions;
  return (
    <ul className="alerts">
      {alerts.map(alert => {
        const { id } = alert;
        return (
          <Alert
            {...alert}
            key={id}
            onDismissClick={() => {
              hideAlert(id);              
            }}
          />
        );
      })}
    </ul>
  );
};

Alerts.propTypes = {
  actions: PropTypes.shape({
    hideAlert: PropTypes.func.isRequired
  }).isRequired,
  alerts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ hideAlert }, dispatch)
});

function mapStateToProps(state) {
  const { alerts } = state;
  return {
    alerts
  };
}

const connectedAlerts = connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
export { connectedAlerts as Alerts };
