'use client';

import { authSelectAtom } from '@/atom/authAtom';
import { useAtom } from 'jotai';

const SignInOrUp = () => {
  const [authType, setAuthType] = useAtom(authSelectAtom);

  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="font-semibold text-gray-400 text-2xl">{authType === 'signIn' ? '로그인' : '회원가입'}</h2>
      <button
        className="border-2 rounded px-1 text-gray-500 hover:bg-gray-200"
        onClick={() => setAuthType((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'))}
      >
        {authType === 'signIn' ? '회원가입' : '로그인'}
      </button>
    </div>
  );
};

export default SignInOrUp;
