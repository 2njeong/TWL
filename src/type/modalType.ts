export type ModalState = {
  isOpen: boolean;
  type: string;
  title: string;
  content: string;
  onFunc?: any;
  offFunc?: () => void | undefined;
};

export type ModalProps = Omit<ModalState, 'isOpen' | 'offFunc'>;
