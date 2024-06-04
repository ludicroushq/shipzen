'use server';
import { signIn, signOut } from '.';

export async function signInAction() {
  await signIn();
}

export async function signOutAction() {
  await signOut();
}
