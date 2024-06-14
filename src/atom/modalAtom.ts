import { atom } from 'jotai';

type ModalState = {
  isOpen: boolean;
  type: string;
  name: string;
  text: string;
  onFunc?: any;
  offFunc?: () => void;
};

export const modalState = atom<ModalState>({
  isOpen: false,
  type: 'alert',
  name: '',
  text: '',
  onFunc: undefined,
  offFunc: undefined
});

export const openModal = atom(
  (get) => get(modalState),
  (get, set, { type, name, text, onFunc }) => {
    set(modalState, (prev) => ({
      ...prev,
      isOpen: true,
      type,
      name,
      text,
      onFunc: () => {
        onFunc();
        set(modalState, (prev) => ({ ...prev, isOpen: false }));
      },
      offFunc: () => set(modalState, (prev) => ({ ...prev, isOpen: false }))
    }));
  }
);
