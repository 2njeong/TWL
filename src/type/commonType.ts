import { ReactNode } from 'react';

export type BtnProps = {
  formId?: string;
  sectionClasName?: string;
  buttonClassName?: string;
  pendingText: string | ReactNode;
  doneText: string | ReactNode;
};
