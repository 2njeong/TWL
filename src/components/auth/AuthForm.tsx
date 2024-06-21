'use client';

import { handleSignIn, handleSignUp } from '@/app/auth/action';
import { authSelectAtom } from '@/atom/authAtom';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { AuthField, AuthResult, AuthValiationErr } from '@/type/authType';
import { useFormState } from 'react-dom';
import AuthFormBtn from './AuthFormBtn';
import { clientSupabase } from '@/supabase/client';

const AuthForm = () => {
  const [authType] = useAtom(authSelectAtom);
  const [validationErr, setValidationErr] = useState<AuthValiationErr | null>(null);
  const authFormRef = useRef<HTMLFormElement | null>(null);
  const authArr: AuthField[] = ['email', 'nickname', 'password'];

  const handleSignOut = async () => {
    const supabase = clientSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  };

  const submitAuthForm = async (state: any, data: FormData) => {
    const result: AuthResult = authType === 'signIn' ? await handleSignIn(data) : await handleSignUp(data);
    authFormRef.current?.reset();
    if (result.error) {
      setValidationErr(result.error);
      return;
    }
    alert(result.message);
    setValidationErr(null);
  };
  const [_, formAction] = useFormState(submitAuthForm, null);

  return (
    <form className="flex flex-col gap-4" action={formAction} ref={authFormRef}>
      {authArr.map((item) => {
        if (authType === 'signIn' && item === 'nickname') return;
        return (
          <div key={item}>
            <h3>{item[0].toUpperCase() + item.slice(1)}</h3>
            <input name={item} type={item === 'password' ? 'password' : 'text'} />
            {validationErr && <p className="text-sm">{validationErr[item]?._errors[0]}</p>}
          </div>
        );
      })}
      <AuthFormBtn />
      <button onClick={handleSignOut}>로그아웃</button>
    </form>
  );
};

export default AuthForm;
