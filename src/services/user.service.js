import { auth, db, storage } from '@/firebase';
import store from "@/store";

export const userService = {
  register,
  login,
  logout,
  edit,
  editProfileValue,
  uploadCV,
  getByUsername,
  contactUser
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

async function getByUsername(username) {
  try {
    let profile = await db.getUserProfileByUsername(username);
    if (profile) {
      const value = profile.val();
      let profileValue = null;
      if (
        value &&
        typeof value === "object" &&
        Object.keys(value).length >= 0
      ) {
        // there must be better way
        profileValue = value[Object.keys(value)[0]];
        return Promise.resolve(profileValue);
      }

      return Promise.reject('Error during user lookup.');
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}

function logout() {
  auth.doSignOut();
}

function getCurrentAuth() {
  // I'm not sure how good this way is, probably thats a huge mistake
  const currentState = store.getState();
  const { authUser } = currentState.authentication;

  if (!authUser || !authUser.uid) {
    return null;
  }

  return authUser;
}

function edit(profile) {
  const authUser = getCurrentAuth();
  return db.doEditProfile(authUser.uid, profile);
}

function editProfileValue(name, value) {
  const authUser = getCurrentAuth();
  return db.doEditProfileValue(authUser.uid, name, value);
}

function uploadCV(file) {
  return storage.uploadCV(file);
}

function contactUser(email, contactData) {
  return db.storeContact(email, contactData);
}
