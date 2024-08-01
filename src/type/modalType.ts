export type ModalState = {
  elementId: string;
  item?: string;
  item_id?: string | undefined;
  updateItem?: string;
  queryKey?: (string | undefined)[];
  isOpen: boolean;
  type: string;
  title: string;
  content: string | null;
  onFunc?: any;
  offFunc?: () => void | undefined;
};

export type ModalProps = Omit<ModalState, 'isOpen' | 'offFunc'>;

export type ModalPortalProps = { elementId: string };
