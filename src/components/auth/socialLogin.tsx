'use client';

import { authSelectAtom } from '@/atom/authAtom';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';

const SocialLogin = () => {
  const [authType] = useAtom(authSelectAtom);
  if (authType !== 'signIn') return;

  const supabase = clientSupabase();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
    if (error) throw new Error(error?.message);
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
    if (error) throw new Error(error?.message);
  };

  return (
    <div className="flex flex-col gap-1">
      <button onClick={signInWithGoogle} className="border">
        login with google
      </button>
      <button onClick={signInWithGithub} className="border">
        login with github
      </button>
    </div>
  );
};

export default SocialLogin;
