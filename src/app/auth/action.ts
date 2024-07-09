'use server';

import { authSchema } from '@/schema/authSchema';
import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const handleSignIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const { error: zodErr } = authSchema.safeParse({ email, password });
  if (zodErr) {
    return { error: zodErr.format() };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.log('로그인 에러 =>', error.message);
    return { success: false, message: error.message };
  }

  return { success: true };
};

export const handleSignUp = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const nickname = formData.get('nickname') as string;
  const password = formData.get('password') as string;
  const { error: zodErr } = authSchema.safeParse({ email, nickname, password });
  if (zodErr) {
    return { error: zodErr.format() };
  }
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname }
    }
  });
  if (error) {
    console.log('회원가입 에러 =>', error.message);
    return { success: false, message: error.message };
  }
  return { success: true, message: '작성하신 이메일에서 회원가입을 완료해주세요!' };
};

export const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
