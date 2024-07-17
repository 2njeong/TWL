'use client';

import { handleSignIn, handleSignUp } from '@/app/auth/action';
import { authSelectAtom } from '@/atom/authAtom';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { AuthField, AuthResult, AuthValiationErr } from '@/type/authType';
import { useFormState } from 'react-dom';
import AuthFormBtn from './AuthFormBtn';
import { INVALIDUSERDATA, NOTYETCONFIRM } from '@/constants/authConstants';

const AuthForm = () => {
  const [authType] = useAtom(authSelectAtom);
  const [validationErr, setValidationErr] = useState<AuthValiationErr | null>(null);
  const authFormRef = useRef<HTMLFormElement | null>(null);
  const authArr: AuthField[] = ['email', 'nickname', 'password'];

  const submitAuthForm = async (state: any, data: FormData) => {
    const result: AuthResult = authType === 'signIn' ? await handleSignIn(data) : await handleSignUp(data);
    authFormRef.current?.reset();
    if (result.error) {
      setValidationErr(result.error);
      return;
    }
    setValidationErr(null);
    if (result.success) {
      if (authType === 'signUp') {
        alert(result.message);
        return;
      }
      location.replace('/');
    } else {
      const alertMsg =
        result.message === INVALIDUSERDATA
          ? '잘못된 회원정보 입니다.'
          : NOTYETCONFIRM
          ? '이메일에서 회원가입을 완료해주세요!'
          : result.message;
      alert(alertMsg);
    }
  };
  const [_, formAction] = useFormState(submitAuthForm, null);

  return (
    <form className="flex flex-col gap-6" action={formAction} ref={authFormRef}>
      <div className="flex flex-col gap-2">
        {authArr.map((item) => {
          if (authType === 'signIn' && item === 'nickname') return;
          return (
            <div key={item} className="flex flex-col">
              <h3>{item[0].toUpperCase() + item.slice(1)}</h3>
              <input
                name={item}
                type={item === 'password' ? 'password' : 'text'}
                className="border-b w-full focus:outline-none"
              />
              {validationErr && <p className="text-sm text-red-500">{validationErr[item]?._errors[0]}</p>}
            </div>
          );
        })}
      </div>
      <div className="w-full h-20 flex justify-center items-center">
        <AuthFormBtn />
      </div>
    </form>
  );
};

export default AuthForm;
