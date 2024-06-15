import { atom } from 'jotai';

type ModalState = {
  isOpen: boolean;
  type: string;
  title: string;
  content: string;
  onFunc?: any;
  offFunc?: () => void;
};

export const modalState = atom<ModalState>({
  isOpen: false,
  type: 'alert',
  title: '',
  content: '',
  onFunc: undefined,
  offFunc: undefined
});

export const openModal = atom(
  (get) => get(modalState),
  (get, set, { type, title, content, onFunc }) => {
    set(modalState, (prev) => ({
      ...prev,
      isOpen: true,
      type,
      title,
      content,
      onFunc: () => {
        onFunc();
        set(modalState, (prev) => ({ ...prev, isOpen: false }));
      },
      offFunc: () => set(modalState, (prev) => ({ ...prev, isOpen: false }))
    }));
  }
);
