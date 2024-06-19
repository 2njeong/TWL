'use client';

import { handleSignIn, handleSignUp } from '@/app/auth/action';
import { authSelectAtom } from '@/atom/authAtom';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { AuthResult, AuthValiationErr } from '@/type/authType';
import { useFormState } from 'react-dom';
import AuthFormBtn from './AuthFormBtn';
import { clientSupabase } from '@/supabase/client';

const AuthForm = () => {
  const [authType] = useAtom(authSelectAtom);
  const [validationErr, setValidationErr] = useState<AuthValiationErr | null>(null);
  const authFormRef = useRef<HTMLFormElement | null>(null);

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

  const handleSignOut = async () => {
    const supabase = clientSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  };

  return (
    <form className="flex flex-col gap-4" action={formAction} ref={authFormRef}>
      <div>
        <h3>Email</h3>
        <input name="email" type="text"></input>
        {validationErr && <p className="text-sm">{validationErr.email?._errors[0]}</p>}
      </div>
      {authType !== 'signIn' && (
        <div>
          <h3>Nickname</h3>
          <input name="nickname" type="text"></input>
          {validationErr && <p className="text-sm">{validationErr.nickname?._errors[0]}</p>}
        </div>
      )}
      <div>
        <h3>PW</h3>
        <input name="password" type="password"></input>
        {validationErr && <p className="text-sm">{validationErr.password?._errors[0]}</p>}
      </div>
      <AuthFormBtn />
      <button onClick={handleSignOut}>로그아웃</button>
    </form>
  );
};

export default AuthForm;
