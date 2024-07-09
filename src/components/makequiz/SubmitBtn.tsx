'use client';

import { BtnProps } from '@/type/commonType';
import { useFormStatus } from 'react-dom';

const SubmitBtn = ({ btnProps }: { btnProps: BtnProps }) => {
  const { pending } = useFormStatus();
  const { formId, sectionClasName, buttonClassName, pendingText, doneText } = btnProps;

  return (
    <section className={`${sectionClasName ?? 'w-full flex justify-center'}`}>
      <button
        form={formId}
        disabled={pending}
        className={`opacity-${pending ? '50' : '1'} ${buttonClassName ?? 'w-3/6 border rounded'}`}
      >
        {pending ? pendingText : doneText}
      </button>
    </section>
  );
};

export default SubmitBtn;
