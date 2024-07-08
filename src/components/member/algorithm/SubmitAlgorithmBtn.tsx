'use client';

import { useFormStatus } from 'react-dom';

const SubmitAlgorithmBtn = () => {
  const { pending } = useFormStatus();
  return (
    <section className="w-full flex justify-center">
      <button disabled={pending} className={`opacity-${pending ? '50' : '1'} w-3/6 border rounded`}>
        {pending ? '사과가 열리고 있어요..!' : '사과 만들기'}
      </button>
    </section>
  );
};

export default SubmitAlgorithmBtn;
