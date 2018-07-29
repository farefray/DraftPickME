import { beginTask, endTask } from 'redux-nprogress';
import { userConstants } from '../constants';
import { userService } from '../services';
import { addAlert } from './alert.actions';
import history from '../helpers/history';

export const userActions = {
  login,
  logout,
  register,
  edit,
  getAll,
  getByName,
  remove: remove
};

function login(username, password) {
  return dispatch => {
    dispatch(beginTask()); // todo move this into middleware?

    userService.login(username, password)
      .then(
        user => {
          dispatch({
            type: userConstants.LOGIN_SUCCESS,
            user
          });
          history.push('/');
        },
        error => {
          dispatch({
            type: userConstants.LOGIN_FAILURE,
            error
          });
          dispatch(addAlert({
            text: error,
            type: 'danger'
          }));
        }
      )
      .then(() => {
        dispatch(endTask());
      });
  };
}

function logout(redirect = true) {
  console.log('Logging out...');
  if (redirect === true) {
    history.push('/');
  }

  userService.logout();

  return {
    type: userConstants.LOGOUT
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

        // relogin user to update his storage for current customer
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          user
        });

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
      .then(
        // eslint-disable-next-line no-unused-vars
        user => {
          history.push('/login');
          dispatch(addAlert({
            text: "Successfull registration!",
            type: 'success'
          }));
        },
        error => {
          dispatch(addAlert({
            text: error,
            type: 'warning'
          }));
        }
      )
      .then(() => {
        dispatch(endTask());
      });
  };
}

function getByName(username) {
  return dispatch => {
    dispatch(beginTask()); // todo move this into middleware?
    dispatch(request());

    userService.getByName(username)
      .then(
        user => {
          dispatch({
            type: userConstants.GETBYNAME_SUCCESS,
            user
          });
        },
        error => {
          dispatch({
            type: userConstants.GETBYNAME_FAILURE,
            error
          });
        }
      )
      .then(() => {
        dispatch(endTask());
      });
  };

  function request() {
    return {
      type: userConstants.GETBYNAME_REQUEST
    }
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return {
      type: userConstants.GETALL_REQUEST
    }
  }

  function success(users) {
    return {
      type: userConstants.GETALL_SUCCESS,
      users
    }
  }

  function failure(error) {
    return {
      type: userConstants.GETALL_FAILURE,
      error
    }
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  return dispatch => {
    dispatch(request(id));

    userService.remove(id)
      .then(
        // eslint-disable-next-line no-unused-vars
        user => {
          dispatch(success(id));
        },
        error => {
          dispatch(failure(id, error));
        }
      );
  };

  function request(id) {
    return {
      type: userConstants.DELETE_REQUEST,
      id
    }
  }

  function success(id) {
    return {
      type: userConstants.DELETE_SUCCESS,
      id
    }
  }

  function failure(id, error) {
    return {
      type: userConstants.DELETE_FAILURE,
      id,
      error
    }
  }
}
