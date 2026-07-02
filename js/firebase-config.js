import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAl249CClqKC109FG2zGIcQnrgTtnHDLuU",
  authDomain: "sinan-portfolio-705a2.firebaseapp.com",
  databaseURL: "https://sinan-portfolio-705a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sinan-portfolio-705a2",
  storageBucket: "sinan-portfolio-705a2.firebasestorage.app",
  messagingSenderId: "996709424777",
  appId: "1:996709424777:web:5021451925bd02cf583058",
  measurementId: "G-PDM3Q2VTGX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);

export function watchRtdb(path, callback, fallback) {
  const dbRef = ref(rtdb, path);
  return onValue(dbRef, (snap) => {
    if (!snap.exists()) { callback(fallback); return; }
    const data = snap.val();
    if (Array.isArray(data)) { callback(data); return; }
    if (typeof data === 'object' && data !== null) {
      const items = Object.values(data);
      callback(items.length ? items : fallback);
      return;
    }
    callback(fallback);
  }, (err) => {
    console.error("RTDB error:", err);
    callback(fallback);
  });
}

export const RTDB_PATHS = {
  categories: '/categories/current/items',
  videos: '/videos/current/items',
  testimonials: '/testimonials/current/items'
};
