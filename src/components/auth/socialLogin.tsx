'use client';

import { authSelectAtom } from '@/atom/authAtom';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';

const SocialLogin = () => {
  const supabase = clientSupabase();
  const [authType] = useAtom(authSelectAtom);
  if (authType !== 'signIn') return;

  const socialLoginArr = [
    { name: 'google', text: 'login with google' },
    { name: 'github', text: 'login with github' }
  ];

  const getCallbackURL = () => {
    let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';
    url = url.includes('http') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return `${url}/auth/callback`;
  };

  const socialLoginIn = async (name: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: name,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: getCallbackURL()
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
