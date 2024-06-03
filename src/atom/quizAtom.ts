import { atom } from 'jotai';

export const quizTyper = atom('객관식');

export const inputAtom = atom([1]);

export const answerAtom = atom<string[] | null>(null);
