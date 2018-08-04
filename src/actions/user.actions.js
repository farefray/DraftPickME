import { beginTask, endTask } from 'redux-nprogress';
import { userConstants } from '../constants';
import { userService } from '../services';
import { addAlert } from './alert.actions';
import history from '../helpers/history';

export const userActions = {
  login,
  authChanged,
  register,
  edit
};

function login(email, password) {
  return dispatch => {
    dispatch(beginTask()); // todo move this into middleware?

    userService.login(email, password)
      .then(() => {

        history.push('/');

        dispatch(addAlert({
          text: "Welcome!",
          type: 'success'
        }));
      })
      .catch(error => {
        dispatch(addAlert({
          text: error.message,
          type: 'warning'
        }));
      })
      .finally(() => {
        dispatch(endTask());
      });
  };
}

function authChanged(authUser) {
  return dispatch => {
    if (authUser !== null) {
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        authUser
      });
    } else {
      dispatch({
        type: userConstants.LOGOUT
      });
    }
  };
}

function edit(profile) {
  return (dispatch) => {
    dispatch(beginTask());

    userService.edit(profile)
      .then(() => {
        dispatch(addAlert({
          text: "Profile saved!",
          type: 'success'
        }));
      }, (error) => {
        dispatch(addAlert({
          text: error.message,
          type: 'warning'
        }));
      })
      .then(() => {
        dispatch(endTask());
      });
  };
}

function register(user) {
  return dispatch => {
    dispatch(beginTask());

    userService.register(user)
      .then(() => {
        history.push('/');
        dispatch(addAlert({
          text: "Successfull registration for " + user.username,
          type: 'success'
        }));
      })
      .catch(error => {
        dispatch(addAlert({
          text: error.message,
          type: 'warning'
        }));
      })
      .then(() => {
        dispatch(endTask());
      });
  };
}
