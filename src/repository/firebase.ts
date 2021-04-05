import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Game } from '../types/game';

const firebaseConfig = {
  apiKey: 'AIzaSyDynbX3QT9x8e8qMtTsD6vnVMD6wHXe4Ug',
  authDomain: 'planning-poker-b946f.firebaseapp.com',
  projectId: 'planning-poker-b946f',
  storageBucket: 'planning-poker-b946f.appspot.com',
  messagingSenderId: '905950444049',
  appId: '1:905950444049:web:e3e56171532bfe47b20fb0',
  measurementId: 'G-LEK1503CC0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const addData = (game: Game) => {
  const db = firebase.firestore();
  db.collection('games')
    .add(game)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const getData = async (id: string): Promise<Game | undefined> => {
  const db = firebase.firestore();
  const response = db.collection('games').where('id', '==', id);
  const results = await response.get();
  let game = undefined;
  results.forEach((doc) => {
    game = doc.data();
  });
  return game;
};

export const streamData = async (id: string): Promise<Game | undefined> => {
  const db = firebase.firestore();
  const response = db.collection('games').where('id', '==', id);
  const results = await response.get();
  let game = undefined;
  results.forEach((doc) => {
    game = doc.data();
  });
  return game;
};

export const updateData = async (game: Game): Promise<Game | undefined> => {
  const db = firebase.firestore();
  const response = db.collection('games').where('id', '==', game.id);
  const results = await response.get();
  let res = undefined;
  results.forEach(async (doc) => {
    res = await doc.ref.update(game);
  });
  return res;
};
