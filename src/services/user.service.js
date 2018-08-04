import { auth, db, storage} from '@/firebase';
import store from "@/store";

export const userService = {
  register,
  login,
  logout,
  edit,
  uploadCV
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

function edit(profile) {
  // I'm not sure how good this way is, probably thats a huge mistake
  const currentState = store.getState();
  const {authUser} = currentState.authentication;

  if(!authUser || !authUser.uid) {
    return false;
  }
  return db.doEditProfile(authUser.uid, profile);
}

function uploadCV(file) {
  return storage.uploadCV(file);
}
