"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";

import { Button } from "../button/Button";

import { Icons } from "@/shared/icons/index.icons";

import scss from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "default" | "second";
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  variant = "default",
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!mounted || !isOpen) return null;

  const modalRoot = document.querySelector("#modal-root");

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={classNames(scss["modal"], scss[`modal--variant-${variant}`])}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={scss["modal__inner"]}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          theme="secondary"
          iconSize="big"
          size="medium"
          onClick={onClose}
          variant="icon"
          className={scss["modal__close"]}
          iconLeft={<Icons.CloseIcon />}
          animationIconHover="default"
        ></Button>

        <div className={scss["modal__content"]}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
