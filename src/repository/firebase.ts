import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Game } from '../types/game';
import { Player } from '../types/player';

const firebaseConfig = {
  apiKey: process.env.VITE_FB_API_KEY,
  authDomain: process.env.VITE_FB_AUTH_DOMAIN,
  projectId: process.env.VITE_FB_PROJECT_ID,
  storageBucket: process.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FB_APP_ID,
  measurementId: process.env.VITE_FB_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const gamesCollectionName = 'games';
const playersCollectionName = 'players';
const db = firebase.firestore();
db.settings({ experimentalAutoDetectLongPolling: true });
// Use Firestore Emulator if the environment variable is set
if (process.env.VITE_USE_FIRESTORE_EMULATOR === 'true') {
  console.log('Using Firestore Emulator');
  // application host name
  const emulatorHost = window.location.hostname;
  db.useEmulator(emulatorHost, 8080); // Point to the Firestore Emulator
}

export const addGameToStore = async (gameId: string, data: any) => {
  await db.collection(gamesCollectionName).doc(gameId).set(data);
  return true;
};

export const getGameFromStore = async (id: string): Promise<Game | undefined> => {
  const response = db.collection(gamesCollectionName).doc(id);
  const result = await response.get();
  let game = undefined;
  if (result.exists) {
    game = result.data();
  }
  return game as Game;
};

export const getPlayersFromStore = async (gameId: string): Promise<Player[]> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(playersCollectionName);
  const results = await response.get();
  let players: Player[] = [];
  results.forEach((result) => players.push(result.data() as Player));
  return players;
};

export const getPlayerFromStore = async (
  gameId: string,
  playerId: string,
): Promise<Player | undefined> => {
  const db = firebase.firestore();
  const response = db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName)
    .doc(playerId);
  const result = await response.get();
  let player = undefined;
  if (result.exists) {
    player = result.data();
  }
  return player as Player;
};

export const streamData = (id: string) => {
  return db.collection(gamesCollectionName).doc(id);
};
export const streamPlayersFromStore = (id: string) => {
  return db.collection(gamesCollectionName).doc(id).collection(playersCollectionName);
};

export const updateGameDataInStore = async (gameId: string, data: any): Promise<boolean> => {
  const db = firebase.firestore();
  await db.collection(gamesCollectionName).doc(gameId).update(data);
  return true;
};

export const addPlayerToGameInStore = async (gameId: string, player: Player) => {
  await db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName)
    .doc(player.id)
    .set(player);
  return true;
};

export const removePlayerFromGameInStore = async (gameId: string, playerId: string) => {
  await db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName)
    .doc(playerId)
    .delete();
  return true;
};

export const updatePlayerInStore = async (gameId: string, player: Player) => {
  await db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName)
    .doc(player.id)
    .update(player);

  return true;
};

export const removeGameFromStore = async (gameId: string) => {
  await db.collection(gamesCollectionName).doc(gameId).delete();
  await db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName)
    .get()
    .then((res) => {
      res.forEach((element) => {
        element.ref.delete();
      });
    });
  return true;
};

export const removeOldGameFromStore = async () => {
  const monthsToDelete = 6;
  const dateObj = new Date();
  const requiredDate = new Date(dateObj.setMonth(dateObj.getMonth() - monthsToDelete));
  const games = await db
    .collection(gamesCollectionName)
    .where('createdAt', '<', requiredDate)
    .get();

  console.log('Games length', games.docs.length);
  if (games.docs.length > 0) {
    const data = games.docs[0].data();
    console.log(data);
    console.log(games.docs[games.docs.length - 1].data());
    console.log(data.createdAt.toDate().toString());
    console.log(games.docs[games.docs.length - 1].data().createdAt.toDate().toString());
    const gamesCollection: any = [];

    games.forEach((game) => {
      gamesCollection.push(game);
    });
    for (let game of gamesCollection) {
      console.log('Deleting:', game.data().name);
      const players = await game.ref.collection(playersCollectionName).get();
      const playersCollection: any = [];
      players.forEach((player: Player) => {
        playersCollection.push(player);
      });
      for (let player of playersCollection) {
        await player.ref.delete();
      }
      await game.ref.delete();
      console.log('deleted');
    }
  }

  return true;
};
