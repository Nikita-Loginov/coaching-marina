import classNames from "classnames";

import { Hero } from "@/shared/ui/index.ui";
import { ReviewsSection } from "@/widgets/reviews";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import { getProgramById } from "@/entities/program/model/program.queries";

import { EducationInfo } from "./education-info/EducationInfo";

import { TeamsSection } from "@/widgets/teams";

import scss from "./Education.module.scss";

interface ProgramProps {
  id: string;
}

export const Education = async () => {
  const programEducation = await getProgramById("training-programs");

  if (!programEducation) return <p>Такой программы нет</p>;

  return (
    <>
      <Hero
        title={{
          label: "Бизнес-практикумы,",
          // labelAccent: "меняющее мышление.",
          variant: "h1",
        }}
        badge={programEducation.name}
        innerGrid="default"
        bottomInfo={{
          position: "bottom",
          content: (
            <div className={scss["edication__block"]}>
              <div
                className={classNames(
                  "textbox textbox--second",
                  scss["edication__textbox"]
                )}
              >
                {programEducation.descriptionFull.map((text, index) => {
                  return <p key={index}>{text}</p>;
                })}
              </div>

              {programEducation.btnTextInner && (
                <div className={scss["edication_btns"]}>
                  <ContactMessageBtn theme="primary" size="medium">
                    <p className="p2">{programEducation.btnTextInner}</p>
                  </ContactMessageBtn>
                </div>
              )}
            </div>
          ),
        }}
      />

      <EducationInfo />

      <ReviewsSection reviews={programEducation.reviews} />

      {programEducation.teamShowed && <TeamsSection />}
    </>
  );
};

export default Education;
