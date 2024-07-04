import { serverSupabase } from '@/supabase/server';
import { Tables } from '@/type/database';

export const fetchCurrentUser = async (): Promise<Tables<'users'>> => {
  const response = await fetch(`/auth/api?type=currentUser`);
  if (!response.ok) {
    throw new Error('UserData response was not ok');
  }
  return response.json();
};

export const fetchQuizCreator = async (creator: string): Promise<Tables<'users'>[] | null> => {
  const response = await fetch(`/auth/api?type=quizCreator&creator=${creator}`);
  if (!response.ok) {
    throw new Error('quizCreator response was not ok');
  }
  return response.json();
};
