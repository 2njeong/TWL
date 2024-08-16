'use client';

import { authSelectAtom } from '@/atom/authAtom';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';

const SocialLogin = () => {
  const [authType] = useAtom(authSelectAtom);
  if (authType !== 'signIn') return;

  const socialLoginArr = [
    { name: 'google', text: 'login with google' },
    { name: 'github', text: 'login with github' }
  ];

  const socialLoginIn = async (name: 'google' | 'github') => {
    const { error } = await clientSupabase.auth.signInWithOAuth({
      provider: name,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
        // redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
    if (error) throw new Error(error?.message);
  };

  return (
    <div className="flex flex-col gap-2">
      {socialLoginArr.map((social) => (
        <button
          key={social.name}
          onClick={async () => await socialLoginIn(social.name as 'google' | 'github')}
          className="border rounded-md px-1 py-0.5 hover:bg-gray-200"
        >
          {social.text}
        </button>
      ))}
    </div>
  );
};

export default SocialLogin;
