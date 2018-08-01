import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () => {
  return db.ref('users').once('value');
}

export const onceGetUserByUsername = (username) => {
  return db.ref('users').orderByChild("username").equalTo(username).once('value');
}

// Other Entity APIs ...
