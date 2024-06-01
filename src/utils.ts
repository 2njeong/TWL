import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { InputFormData } from './types/testType';

export const addFireStore = async (data: InputFormData) => {
  try {
    await addDoc(collection(db, 'test'), data);
  } catch (e) {
    console.error(e);
  }
};
