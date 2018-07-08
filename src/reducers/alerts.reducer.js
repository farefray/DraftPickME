import {
  alertConstants
} from "../constants";

export function alerts(state = [], action) {
  const {
    payload,
    type
  } = action;

  switch (type) {
    case alertConstants.ADD_ALERT:
      return [payload, ...state];

    case alertConstants.HIDE_ALERT:
      {
        return state.map(alert =>
          alert.id === payload ? { ...alert,
            animationClass: 'fadeOutRightBig'
          } :
          alert
        );
      }

    case alertConstants.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);

    default:
      return state;
  }
}
