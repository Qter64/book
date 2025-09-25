// Инициализация Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const eventForm = document.getElementById('eventForm');
const saveEventBtn = document.getElementById('saveEventBtn');
const eventTitle = document.getElementById('eventTitle');
const eventDescription = document.getElementById('eventDescription');
const calendar = document.getElementById('calendar');

loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(() => {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      eventForm.style.display = 'block';
      loadEvents();
    })
    .catch((error) => {
      console.error(error);
    });
});

logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      eventForm.style.display = 'none';
      calendar.innerHTML = '';
    })
    .catch((error) => {
      console.error(error);
    });
});

saveEventBtn.addEventListener('click', () => {
  const title = eventTitle.value;
  const description = eventDescription.value;

  if (title && description) {
    addDoc(collection(db, 'events'), {
      title,
      description,
      date: new Date(),
    })
      .then(() => {
        eventTitle.value = '';
        eventDescription.value = '';
        loadEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

function loadEvents() {
  getDocs(collection(db, 'events'))
    .then((querySnapshot) => {
      calendar.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        const eventElement = document.createElement('div');
        eventElement.textContent = `${event.title}: ${event.description}`;
        calendar.appendChild(eventElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
