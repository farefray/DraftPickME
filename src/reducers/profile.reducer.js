import { userConstants } from '../constants';

export function profile(state = {}, action) {
  switch (action.type) {
    case userConstants.GETBYNAME_REQUEST: {
      return {
        loading: true
      }
    }
    case userConstants.GETBYNAME_SUCCESS: {
      return {
        user: action.user,
        loading: false
      };
    }
    case userConstants.GETBYNAME_FAILURE: {
      return {
        user: null,
        error: action.error,
        loading: false
      }
    }
    default:
      return state
  }
}
