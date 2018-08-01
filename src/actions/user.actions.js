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
  edit
};

function login(email, password) {
  return dispatch => {
    dispatch(beginTask()); // todo move this into middleware?

    auth.doSignInWithEmailAndPassword(email, password)
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

