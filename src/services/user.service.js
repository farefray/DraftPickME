import { auth, db } from '@/firebase';

export const userService = {
  register,
  login,
  logout,
  edit,
  getAll,
  update,
  remove: remove
};

function login(email, password) {
  return auth.doSignInWithEmailAndPassword(email, password);
}

async function register(user) {
  try {
    let authUser = await auth.doCreateUserWithEmailAndPassword(user.email, user.password);
    if (authUser) {
      db.doCreateUser(authUser.user.uid, user.username, user.email, user.firstName, user.lastName)
      return Promise.resolve(authUser.user.uid);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function logout() {
  auth.doSignOut();
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch('/users', requestOptions).then(handleResponse);
}

function edit(user) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(user)
  };

  return fetch('/users/edit/' + user.id, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(user)
  };

  return fetch('/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: 'DELETE',
  };

  return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
