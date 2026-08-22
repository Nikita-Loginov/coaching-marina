import { Container } from "@/shared/ui/index.ui";

import { ProgramCard } from "@/entities/program/ui";

import { ProgramsModal } from "./parts/programs-modal/ProgramsModal";

import { getPrograms } from "@/entities/program/model/program.queries";

import scss from "./ProgramsSection.module.scss";


const CHAPTER_NAMES = [
  "первая",
  "вторая",
  "третья",
  "четвертая",
  "пятая",
  "шестая",
  "седьмая",
  "восьмая",
  "девятая",
  "десятая",
];

export const ProgramsSection = async () => {
  const programs = await getPrograms();
  
  return (
    <>
      <section className={scss["programs"]} id="programs">
        <Container>
          <div className={scss["programs__inner"]}>
            <div className={scss["programs__items"]}>
              {programs.map((program, index) => {
                const chapterNumber = index + 1;
                const chapter = CHAPTER_NAMES[index] ?? `${chapterNumber}-я`;

                return (
                  <ProgramCard
                    key={program.id}
                    card={{
                      ...program,
                      badge: `${String(chapterNumber).padStart(
                        2,
                        "0"
                      )} — Глава ${chapter}`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <ProgramsModal programs={programs} />
    </>
  );
};
