import { beginTask, endTask } from 'redux-nprogress';
import { userConstants } from '../constants';
import { userService } from '../services';
import { addAlert } from './alert.actions';
import history from '../helpers/history';
import { auth, db } from '@/firebase';

export const userActions = {
  login,
  logout,
  register,
  edit,
  getByName
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

    auth.doCreateUserWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, user.username, user.email)
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

