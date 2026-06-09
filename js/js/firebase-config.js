import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAl249CClqKC109FG2zGIcQnrgTtnHDLuU",
  authDomain: "sinan-portfolio-705a2.firebaseapp.com",
  projectId: "sinan-portfolio-705a2",
  storageBucket: "sinan-portfolio-705a2.firebasestorage.app",
  messagingSenderId: "996709424777",
  appId: "1:996709424777:web:5021451925bd02cf583058",
  measurementId: "G-PDM3Q2VTGX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);
