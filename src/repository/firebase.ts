import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/firestore";
import { Game } from "../types/game";
import { Player } from "../types/player";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const gamesCollectionName = "games";
const playersCollectionName = "players";
const db = firebase.firestore();

export const addGameToStore = async (gameId: string, data: any) => {
  await db.collection(gamesCollectionName).doc(gameId).set(data);
  return true;
};

export const getGameFromStore = async (
  id: string
): Promise<Game | undefined> => {
  const response = db.collection(gamesCollectionName).doc(id);
  const result = await response.get();
  let game = undefined;
  if (result.exists) {
    game = result.data();
  }
  return game as Game;
};

export const getPlayersFromStore = async (
  gameId: string
): Promise<Player[]> => {
  const db = firebase.firestore();
  const response = db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName);
  const results = await response.get();
  let players: Player[] = [];
  results.forEach((result) => players.push(result.data() as Player));
  return players;
};

export const getPlayerFromStore = async (
  gameId: string,
  playerId: string
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
  return db
    .collection(gamesCollectionName)
    .doc(id)
    .collection(playersCollectionName);
};

export const updateGameDataInStore = async (
  gameId: string,
  data: any
): Promise<boolean> => {
  const db = firebase.firestore();
  await db.collection(gamesCollectionName).doc(gameId).update(data);
  return true;
};

export const addPlayerToGameInStore = async (
  gameId: string,
  player: Player
) => {
  await db
    .collection(gamesCollectionName)
    .doc(gameId)
    .collection(playersCollectionName)
    .doc(player.id)
    .set(player);
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
