import { create } from 'zustand';

import { ModalState } from './modal-store.types';

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalProps: null,

  open: (modal, props) =>
    set({
      activeModal: modal,
      modalProps: { modal, props } as ModalState['modalProps'],
    }),

  close: () =>
    set({
      activeModal: null,
      modalProps: null,
    }),
}));
