import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("todo-application.json").toString());

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();
