import { storage } from './firebase-config.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

export async function uploadImage(file, path) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

export async function uploadProject(file, name) {
  const timestamp = Date.now();
  const path = `uploads/projects/${timestamp}_${name}`;
  return await uploadImage(file, path);
}

export async function uploadAvatar(file, name) {
  const timestamp = Date.now();
  const path = `uploads/avatars/${timestamp}_${name}`;
  return await uploadImage(file, path);
}
