'use client';

import { useFormStatus } from 'react-dom';

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <section className="w-full flex justify-center">
      <button disabled={pending} className={`opacity-${pending ? '50' : '1'} w-3/6 border rounded`}>
        {pending ? '문제를 만드는 중...' : '문제 만들기'}
      </button>
    </section>
  );
};

export default SubmitBtn;
