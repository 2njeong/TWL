'use client';

import { useFormStatus } from 'react-dom';

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <button disabled={pending}>Submit</button>
    </>
  );
};

export default SubmitBtn;
