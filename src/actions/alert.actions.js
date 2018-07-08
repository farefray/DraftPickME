import {
  alertConstants
} from "../constants";
import {
  createAlert
} from "../factories/createAlert";

export function addAlert(options = {}) {
  let alert = createAlert(options);
  return dispatch => {
    console.log(alert);
    setTimeout(() => {
      dispatch(hideAlert(alert.id));
    }, 5000);

    return dispatch({
      payload: alert,
      type: alertConstants.ADD_ALERT
    });
  };  
}

export function hideAlert(id) {
  return dispatch => {
    setTimeout(() => {
      dispatch(removeAlert(id));
    }, 500);

    return dispatch({
      payload: id,
      type: alertConstants.HIDE_ALERT
    });
  };  
}

export function removeAlert(id) {
  return {
    payload: id,
    type: alertConstants.REMOVE_ALERT
  };
}
