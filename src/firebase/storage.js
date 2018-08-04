import { storage } from './firebase';

export const uploadFile = (file, type) => {
    return storage.ref(`${type}/${file.name}`).put(file);
}
