import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

export interface Product {
    name: string;
    category: string;
    description: string;
    discount: number;
    price: number;
    review: number;
    models: string[];
    images: string[];
}

export const auth = getAuth(app);

export function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function signout() {
    return signOut(auth);
}
