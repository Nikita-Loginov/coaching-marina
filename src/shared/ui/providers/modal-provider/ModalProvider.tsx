"use client";

import { useEffect } from "react";
import { useModalStore } from "@/shared/store/modal/modal.store";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const activeModal = useModalStore((store) => store.activeModal);

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("open-modal");
    } else {
      document.body.classList.remove("open-modal");
    }
  }, [activeModal]);

  return children;
};
