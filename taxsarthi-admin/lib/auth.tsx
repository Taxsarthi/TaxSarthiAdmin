import { signOut as firebaseSignOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { auth } from "./firebase";

export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null | false>(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user || false));
  }, []);
  return user;
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};
