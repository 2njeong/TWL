'use server';

import { authSchema } from '@/schema/authSchema';
import { serverSupabase } from '@/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const supabase = serverSupabase();

export const handleSignIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const { error: zodErr } = authSchema.safeParse({ email, password });
  if (zodErr) {
    return { error: zodErr.format() };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  const url = new URL(`${headers().get('referer')}`);
  redirect(url.origin);
};

export const handleSignUp = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const { error: zodErr } = authSchema.safeParse(data);
  if (zodErr) {
    return { error: zodErr.format() };
  }
  const { error } = await supabase.auth.signUp(data as any);
  if (error) throw new Error(error.message);
  return { message: '작성하신 이메일에서 회원가입을 완료해주세요!' };
};

export const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
