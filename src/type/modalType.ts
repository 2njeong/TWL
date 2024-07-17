export type ModalState = {
  elementId: string;
  isOpen: boolean;
  type: string;
  title: string;
  content: string | null;
  onFunc?: any;
  offFunc?: () => void | undefined;
};

export type ModalProps = Omit<ModalState, 'isOpen' | 'offFunc'>;

export type ModalPortalProps = { elementId: string };
