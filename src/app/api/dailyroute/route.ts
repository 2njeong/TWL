import { addDoc, collection } from 'firebase/firestore';
import { NextRequest } from 'next/server';
import { db } from '../../../../firebase';

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const docRef = await addDoc(collection(db, 'test'), data);
    return Response.json(docRef);
  } catch (e) {
    throw new Error('fail to add a new item');
  }
};
