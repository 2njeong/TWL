import { atom } from 'jotai';

type ModalState = {
  isOpen: boolean;
  type: string;
  name: string;
  text: string;
  onFunc?: any;
  offFunc?: () => void;
};

export const modalAtom = atom<ModalState>({
  isOpen: false,
  type: 'alert',
  name: '',
  text: '',
  onFunc: undefined,
  offFunc: undefined
});

export const openModal = atom(
  (get) => get(modalAtom),
  (get, set, { type, name, text, onFunc }) => {
    set(modalAtom, (prev) => ({
      ...prev,
      isOpen: true,
      type,
      name,
      text,
      onFunc: () => {
        onFunc();
        set(modalAtom, (prev) => ({ ...prev, isOpen: false }));
      },
      offFunc: () => set(modalAtom, (prev) => ({ ...prev, isOpen: false }))
    }));
  }
);
