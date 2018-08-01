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

function edit(user) {
  return (dispatch) => {
    dispatch(beginTask());

    userService.edit(user)
      .then(() => {
        dispatch(addAlert({
          text: "Profile saved!",
          type: 'success'
        }));


        // update user in local storage in order to keep our changes.
        // TODO better way for auth and this part. Make it DRY and not that leakable.
        localStorage.setItem('user', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('user')), user)));
      }, (error) => {
        dispatch(addAlert({
          text: error,
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
        history.push('/login');
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
