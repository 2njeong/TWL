import { atom } from 'jotai';

export const categoryAtom = atom<string>('질문');

export const avatarAtom = atom<File | null>(null);

export const pageAtom = atom(1);

export const totalPageAtom = atom(1);
