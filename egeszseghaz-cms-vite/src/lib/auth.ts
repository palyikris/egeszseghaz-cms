/* eslint-disable prettier/prettier */
import { auth, db } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection } from "firebase/firestore";
import { getDocs } from 'firebase/firestore';

export function isAuthenticated() {
  const user = auth.currentUser;

  return user !== null;
}

export function getCurrentUserId(): string | null {
  const user = auth.currentUser;

  return user ? user.uid : null;
}

export function getCurrentUserEmail(): string | null {
  const user = auth.currentUser;

  return user ? user.email : null;
}

export function getUserAvatarUrl(): string | null {
  const user = auth.currentUser;

  return user && user.photoURL ? user.photoURL : null;
}

export async function signInWithGoogle() {
  const user = await signInWithPopup(auth, new GoogleAuthProvider());
  const allowedEmails = await getAllowedEmails();

  if (!user) {
    throw new Error("Hiba a bejelentkezés során.");
  }

  if (!allowedEmails.includes(user.user.email || "")) {
    auth.signOut();
    throw new Error("Nincs jogosultságod a belépéshez.");
  }

  return user;
}

export async function getAllowedEmails(): Promise<string[]> {
  const ref = collection(db, "login")
  const docs = await getDocs(ref);
  const emails: string[] = [];

  docs.forEach((doc) => {
    const data = doc.data();

    if (data.email) {
      emails.push(data.email);
    }
  });

  return emails;
}