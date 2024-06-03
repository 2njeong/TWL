'use server';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const showText = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('data =>', data);
};

export const submitBtn = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('전체', data);
  try {
    await addDoc(collection(db, 'quiz'), formData);
  } catch (error) {
    throw new Error('fail to add quiz');
  }
};
