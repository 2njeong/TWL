import { atom } from 'jotai';

export const categoryAtom = atom<string | null>(null);

export const avatarAtom = atom<File | null>(null);
