import { Tables } from '@/type/database';
import { getToday } from '@/utils/utilFns';
import { atom } from 'jotai';

export const categoryAtom = atom<string>('Todo');

export const avatarAtom = atom<File | null>(null);

export const pageAtom = atom(1);

export const totalPageAtom = atom(1);

export const todolistAtom = atom<Tables<'todolist'>[]>([]);

export const dayAtom = atom<string>(getToday());
