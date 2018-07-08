import {
  alertConstants
} from "../constants";
import {
  createAlert
} from "../factories/createAlert";

export function addAlert(options = {}) {
  console.log(options);
  return {
    payload: createAlert(options),
    type: alertConstants.ADD_ALERT
  };
}

export function hideAlert(id) {
  return {
    payload: id,
    type: alertConstants.HIDE_ALERT
  };
}

export function removeAlert(id) {
  return {
    payload: id,
    type: alertConstants.REMOVE_ALERT
  };
}
