'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type BtnProps = {
  formId?: string;
  disabledCondition?: boolean;
  sectionClassName?: string;
  buttonClassName?: string;
  pendingText: string | ReactNode;
  doneText: string | ReactNode;
};

const SubmitBtn = ({ btnProps }: { btnProps: BtnProps }) => {
  const { pending } = useFormStatus();
  const { formId, disabledCondition, sectionClassName, buttonClassName, pendingText, doneText } = btnProps;

  return (
    <section className={`${sectionClassName ?? 'w-full flex justify-center'}`}>
      <button
        form={formId}
        disabled={disabledCondition ? disabledCondition || pending : pending}
        className={`opacity-${pending ? '50' : '1'} ${buttonClassName ?? 'w-3/6 border rounded'}`}
      >
        {pending ? pendingText : doneText}
      </button>
    </section>
  );
};

export default SubmitBtn;
