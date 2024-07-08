import { ModalProps, ModalState } from '@/type/modalType';
import { atom } from 'jotai';

export const modalState = atom<ModalState>({
  layer: 0,
  isOpen: false,
  type: 'alert',
  title: '',
  content: '',
  onFunc: undefined,
  offFunc: undefined
});

export const openModal = atom(
  (get) => get(modalState),
  (_, set, { layer, type, title, content, onFunc }: ModalProps) => {
    set(modalState, (prev) => ({
      ...prev,
      layer,
      isOpen: true,
      type,
      title,
      content,
      onFunc: onFunc
        ? () => {
            onFunc();
            set(modalState, (prev) => ({ ...prev, isOpen: false }));
          }
        : () => set(modalState, (prev) => ({ ...prev, isOpen: false })),
      offFunc: () => set(modalState, (prev) => ({ ...prev, isOpen: false }))
    }));
  }
);
