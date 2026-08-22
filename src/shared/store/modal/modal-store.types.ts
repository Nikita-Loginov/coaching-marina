export type ModalMap = {
  contact: {};
  program: {
    id: string;
  },
  video: {
    videoSrc: string;
    videoPoster: string;
  }
};

export type ModalType = keyof ModalMap;

type ModalPropsUnion = {
  [K in ModalType]: {
    modal: K;
    props: ModalMap[K];
  };
}[ModalType];

export type ModalState = {
  activeModal: ModalType | null;

  modalProps: ModalPropsUnion | null;

  open: <T extends ModalType>(modal: T, props: ModalMap[T]) => void;

  close: () => void;
};
