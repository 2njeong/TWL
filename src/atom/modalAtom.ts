import { ModalProps, ModalState } from '@/type/modalType';
import { atom } from 'jotai';

export const modalState = atom<ModalState>({
  elementId: 'root',
  isOpen: false,
  type: 'alert',
  title: '',
  content: '',
  onFunc: undefined,
  offFunc: undefined
});

export const openModal = atom(
  (get) => get(modalState),
  (_, set, { elementId, item, item_id, queryKey, type, title, content, onFunc }: ModalProps) => {
    set(modalState, (prev) => ({
      ...prev,
      elementId,
      item,
      item_id,
      queryKey,
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
