'use server';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { revalidatePath } from 'next/cache';

export const serverAdd = async (data: FormData) => {
  const formData = Object.fromEntries(data);

  try {
    const docRef = await addDoc(collection(db, 'test'), formData);
    revalidatePath('/daily');
    return docRef.id;
  } catch (e) {
    console.error(e);
    throw new Error('fail to add a new item');
  }
};

export const beforeFormServerAction = async () => {
  try {
    await addDoc(collection(db, 'like'), { name: 1 });
  } catch (error) {
    throw new Error('좋아요 업로드 실패');
  }
};

export const transitionAdd = async (name: string) => {
  await new Promise((_) => setTimeout(_, 1000));
  try {
    await addDoc(collection(db, 'transition'), { name });
  } catch (error) {
    throw new Error('transition 사용해서 server-action 실패');
  }
};
