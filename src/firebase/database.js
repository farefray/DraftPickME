import { db } from './firebase';

// User API
// TODO move this to user.service

export const doCreateUser = (id, username, email, firstName, lastName) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    firstName,
    lastName
  });

export const doEditProfile = (id, profile) =>
  db.ref(`users/${id}`).update(JSON.parse(JSON.stringify(profile)));

export const onceGetUsers = () => {
  return db.ref('users').once('value');
}

export const onceGetUserByUsername = (username) => {
  return db.ref('users').orderByChild("username").equalTo(username).once('value');
}

// Other Entity APIs ...
