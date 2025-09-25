// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_ПРОЕКТ_ID.firebaseapp.com",
  projectId: "ВАШ_ПРОЕКТ_ID",
  storageBucket: "ВАШ_ПРОЕКТ_ID.appspot.com",
  messagingSenderId: "ВАШ_МЕНЕДЖЕР_ID",
  appId: "ВАШ_APP_ID"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
