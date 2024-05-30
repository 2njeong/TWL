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

// export const beforeFormServerAction = async () => {
//     try {
//         const docRef = await addDoc(collection(db, "like"), {})
//     } catch (error) {

//     }
// }
