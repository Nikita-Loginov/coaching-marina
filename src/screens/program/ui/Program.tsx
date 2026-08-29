import classNames from "classnames";

import { Hero } from "@/shared/ui/index.ui";
import { ProgramInfo } from "./program-info/ProgramInfo";
import { ReviewsSection } from "@/widgets/reviews";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import { getProgramById } from "@/entities/program/model/program.queries";

import scss from "./Program.module.scss";
import { TeamsSection } from "@/widgets/teams";

interface ProgramProps {
  id: string;
}

export const Program = async ({ id }: ProgramProps) => {
  const program = await getProgramById(id);

  if (!program) return <p>Такой программы нет</p>;

  return (
    <>
      <Hero
        title={{
          label: program.name.split(" ").slice(0, -1).join(" "),
          labelAccent: program.name.split(" ").at(-1),
          variant: "h2",
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

              {program.btnTextInner && (
                <div className={scss["program__btns"]}>
                  <ContactMessageBtn theme="primary" size="medium">
                    <p className="p2">{program.btnTextInner}</p>
                  </ContactMessageBtn>
                </div>
              )}
            </div>
          ),
        }}
      />

      <ProgramInfo program={program} />

      <ReviewsSection reviews={program.reviews} />

      {program.teamShowed && <TeamsSection />}
    </>
  );
};

export default Program;
