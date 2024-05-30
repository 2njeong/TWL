'use server';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { revalidatePath } from 'next/cache';
import { testSchema } from './lib/schema';

export const serverAdd = async (data: FormData) => {
  const formData = Object.fromEntries(data);

  // 외부 통신 전 유효성 검사 먼저
  const { error: zodErr } = testSchema.safeParse(formData);
  if (zodErr) {
    return { error: zodErr.format() };
  }
  await new Promise((_) => setTimeout(_, 1000));

  try {
    await addDoc(collection(db, 'test'), formData);
    revalidatePath('/daily');
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

export const serverActionWithUseFormState = async (state: any, formData: FormData) => {
  const data = Object.fromEntries(formData);

  // 외부 통신 전 유효성 검사 먼저
  const { error: zodErr } = testSchema.safeParse(data);
  if (zodErr) {
    return { error: zodErr.format() };
  }
  const result = testSchema.safeParse(data);
  if (result.success) {
    return { data: result.data };
  }
  if (result.error) {
    return { data: result.data };
  }

  try {
    await addDoc(collection(db, 'formAction'), data);
    revalidatePath('/daily');
  } catch (e) {
    console.error(e);
    throw new Error('fail to add a new item');
  }
};

export const deliverMessage = async (message: { text: string | unknown; sending: boolean }[], data: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = Object.fromEntries(data);

  try {
    await addDoc(collection(db, 'optimistic'), formData);
    revalidatePath('/daily');
  } catch (e) {
    console.error(e);
    throw new Error('fail to add a new item');
  }
  return message;
};
