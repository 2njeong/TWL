import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { InputFormData } from './types/testType';

export const addFireStore = async (data: InputFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'test'), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error(e);
  }
};
