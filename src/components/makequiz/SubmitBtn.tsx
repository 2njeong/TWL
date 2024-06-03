'use client';

import { useFormStatus } from 'react-dom';

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={`opacity-${pending ? '50' : '1'}`}>
      {pending ? '문제를 만드는 중...' : '문제 만들기'}
    </button>
  );
};

export default SubmitBtn;
