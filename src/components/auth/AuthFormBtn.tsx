'use client';

import { authSelectAtom } from '@/atom/authAtom';
import { useAtom } from 'jotai';
import { useFormStatus } from 'react-dom';

const AuthFormBtn = () => {
  const { pending } = useFormStatus();
  const [authType] = useAtom(authSelectAtom);
  return (
    <button type="submit" disabled={pending} className={`border ${pending ? 'opacity-30' : null}`}>
      {authType === 'signIn' ? (pending ? 'Login...' : 'Login') : pending ? 'Join...' : 'Join'}
    </button>
  );
};

export default AuthFormBtn;
