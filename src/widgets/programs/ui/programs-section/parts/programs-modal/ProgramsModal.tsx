"use client";

import { Modal } from "@/shared/ui/index.ui";

import { PROGRAMS_ITEMS } from "@/shared/config/programs.config";

import { useModalStore } from "@/store/modal/modal.store";

import { Button } from "@/shared/ui/index.ui";

import scss from "./ProgramsModal.module.scss";
import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

export const ProgramsModal = () => {
  const { activeModal, close, modalProps } = useModalStore();

  const isOpen = activeModal === "program";

  if (!isOpen) return null;

  const id = modalProps?.modal === "program" ? modalProps.props.id : "1";

  const program = PROGRAMS_ITEMS.find((program) => program.id === id);

  if (!program) return null;

  const {
    name,
    descriptionFull,
    forWhom,
    suitableRequests,
    workflow,
    cooperationFormat,
    benefits,
  } = program;

  const programItems = [
    forWhom,
    suitableRequests,
    workflow,
    cooperationFormat,
    benefits,
  ];

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className={scss["programs-modal"]}>
        <div className={scss["programs-modal__head"]}>
          <h2 className="h2 font-text-second">{name}</h2>

          <div className="textbox textbox--second">
            {descriptionFull.map((text, index) => {
              return (
                <p className={"p1"} key={index}>
                  {text}
                </p>
              );
            })}
          </div>
        </div>

        <div className={scss["programs-modal__content"]}>
          <div className={scss["programs-modal__items"]}>
            {programItems.map((programItem) => {
              return (
                <div
                  className={scss["programs-modal__item"]}
                  key={programItem?.title}
                >
                  <p className={scss["programs-modal__item-title"]}>
                    {programItem?.title}
                  </p>

                  <div className={scss["programs-modal__item-content"]}>
                    {programItem?.items.map((item) => {
                      const { as = "default", title, desc } = item;

                      return as === "default" ? (
                        <div className="textbox textbox--second">
                          {desc.map((text, index) => {
                            return (
                              <p className={"p1"} key={index}>
                                {text}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <ul className={scss["programs-modal__item-list"]}>
                          {desc.map((text, index) => {
                            return (
                              <li
                                className={scss["programs-modal__item-link"]}
                                key={index}
                              >
                                <p className="p1">{text}</p>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={scss["programs-modal__footer"]}>
          <div className={scss["programs-modal__btns"]}>
            <ContactMessageBtn theme="primary" size="medium" >
              <p className="p2">Записаться на консультацию</p>
            </ContactMessageBtn>
          </div>
        </div>
      </div>
    </Modal>
  );
};
