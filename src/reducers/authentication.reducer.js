import { userConstants } from '../constants';

const initialState = {
  authUser: null
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        authUser: action.authUser
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: null,
        authUser: null
      };
    default:
      return state
  }
}
