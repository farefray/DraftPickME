import { storage } from './firebase';

export const uploadFile = (file) => {
    return storage.ref(`filepond/${file.name}`).put(file);
}
