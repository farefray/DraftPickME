import { db } from './firebase';

export const doCreateUser = (id, username, email, firstName, lastName) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    firstName,
    lastName
  });

export const doEditProfile = (id, profile) =>
  db.ref(`users/${id}`).update(JSON.parse(JSON.stringify(profile)));

export const doEditProfileValue = (id, field, value) =>
  db.ref(`users/${id}/${field}`).set(JSON.parse(JSON.stringify(value)));

export const onceGetUsers = () => {
  return db.ref('users').once('value');
}

export const getUserProfileByUsername = username => {
  return db.ref('users').orderByChild("username").equalTo(username).once('value');
}

export const storeContact = (email, contactData) => {
  const ref = db.ref(`contacts`);
  const newContact = ref.push();
  return newContact.set({
    sent: false,
    to: email,
    fromEmail: contactData.email,
    fromName: contactData.fullName,
    message: contactData.message
  });
}

