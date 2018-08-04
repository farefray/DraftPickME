import { storage } from './firebase';

export const uploadFile = (file, name) => {
    return storage.ref(`cv/${name}`).put(file);
}
