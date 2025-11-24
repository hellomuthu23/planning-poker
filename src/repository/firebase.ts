import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Game } from '../types/game';
import { Player } from '../types/player';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gamesCollectionName = 'games';
const playersCollectionName = 'players';

export const addGameToStore = async (gameId: string, data: any) => {
  await setDoc(doc(db, gamesCollectionName, gameId), data);
  return true;
};

export const getGameFromStore = async (id: string): Promise<Game | undefined> => {
  const docRef = doc(db, gamesCollectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Game;
  }
  return undefined;
};

export const getPlayersFromStore = async (gameId: string): Promise<Player[]> => {
  const q = collection(db, gamesCollectionName, gameId, playersCollectionName);
  const querySnapshot = await getDocs(q);
  const players: Player[] = [];
  querySnapshot.forEach((doc) => {
    players.push(doc.data() as Player);
  });
  return players;
};

export const getPlayerFromStore = async (
  gameId: string,
  playerId: string,
): Promise<Player | undefined> => {
  const docRef = doc(db, gamesCollectionName, gameId, playersCollectionName, playerId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Player;
  }
  return undefined;
};

export const streamData = (id: string) => {
  return doc(db, gamesCollectionName, id);
};

export const streamPlayersFromStore = (id: string) => {
  return collection(db, gamesCollectionName, id, playersCollectionName);
};

export const updateGameDataInStore = async (gameId: string, data: any): Promise<boolean> => {
  const docRef = doc(db, gamesCollectionName, gameId);
  await updateDoc(docRef, data);
  return true;
};

export const addPlayerToGameInStore = async (gameId: string, player: Player) => {
  const docRef = doc(db, gamesCollectionName, gameId, playersCollectionName, player.id);
  await setDoc(docRef, player);
  return true;
};

export const removePlayerFromGameInStore = async (gameId: string, playerId: string) => {
  const docRef = doc(db, gamesCollectionName, gameId, playersCollectionName, playerId);
  await deleteDoc(docRef);
  return true;
};

export const updatePlayerInStore = async (gameId: string, player: Player) => {
  const docRef = doc(db, gamesCollectionName, gameId, playersCollectionName, player.id);
  await updateDoc(docRef, player as any);
  return true;
};

export const removeGameFromStore = async (gameId: string) => {
  await deleteDoc(doc(db, gamesCollectionName, gameId));

  const playersRef = collection(db, gamesCollectionName, gameId, playersCollectionName);
  const querySnapshot = await getDocs(playersRef);

  const deletePromises: Promise<void>[] = [];
  querySnapshot.forEach((doc) => {
    deletePromises.push(deleteDoc(doc.ref));
  });

  await Promise.all(deletePromises);
  return true;
};

export const removeOldGameFromStore = async () => {
  const monthsToDelete = 6;
  const dateObj = new Date();
  const requiredDate = new Date(dateObj.setMonth(dateObj.getMonth() - monthsToDelete));

  const q = query(collection(db, gamesCollectionName), where('createdAt', '<', requiredDate));
  const games = await getDocs(q);

  console.log('Games length', games.docs.length);
  if (games.docs.length > 0) {
    const data = games.docs[0].data();
    console.log(data);
    console.log(games.docs[games.docs.length - 1].data());
    // Note: toDate() works if the data is a Firestore Timestamp
    console.log(data.createdAt.toDate().toString());
    console.log(games.docs[games.docs.length - 1].data().createdAt.toDate().toString());

    for (const gameDoc of games.docs) {
      console.log('Deleting:', gameDoc.data().name);
      const playersRef = collection(db, gamesCollectionName, gameDoc.id, playersCollectionName);
      const playersSnap = await getDocs(playersRef);

      for (const playerDoc of playersSnap.docs) {
        await deleteDoc(playerDoc.ref);
      }
      await deleteDoc(gameDoc.ref);
      console.log('deleted');
    }
  }

  return true;
};