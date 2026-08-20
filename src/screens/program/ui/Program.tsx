"use client";

import classNames from "classnames";

import { PROGRAMS_ITEMS } from "@/shared/config/programs.config";

import { Hero } from "@/shared/ui/index.ui";
import { ProgramInfo } from "./program-info/ProgramInfo";

import scss from "./Program.module.scss";
import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

interface ProgramProps {
  id: string;
}

export const Program = ({ id }: ProgramProps) => {
  const program = PROGRAMS_ITEMS.find((program) => program.id === id);

  if (!program) return <p>Такой программы нет</p>;

  return (
    <>
      <Hero
        title={{
          label: program.name.split(" ").slice(0, -1).join(" "),
          labelAccent: program.name.split(" ").at(-1),
        }}
        innerGrid="default"
        bottomInfo={{
          position: "bottom",
          content: (
            <div className={scss["program__block"]}>
              <div
                className={classNames(
                  "textbox textbox--second",
                  scss["program__textbox"]
                )}
              >
                {program.descriptionFull.map((text, index) => {
                  return <p key={index}>{text}</p>;
                })}
              </div>

              <div className={scss["program__btns"]}>
                <ContactMessageBtn theme="primary" size="medium">
                  <p className="p2">Записаться на консультацию</p>
                </ContactMessageBtn>
              </div>
            </div>
          ),
        }}
      />

      <ProgramInfo program={program} />
    </>
  );
};

export default Program;