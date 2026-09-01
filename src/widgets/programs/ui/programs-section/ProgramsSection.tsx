import { Container, TopInner } from "@/shared/ui/index.ui";

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

  const generalPrograms = programs.filter(
    (program) => program.type === "GENERAL"
  );

  return (
    <>
      <section className={scss["programs"]} id="programs">
        <Container>
          <TopInner
            items={[
              {
                title: {
                  label: 'Как мы',
                  labelAccent: 'работаем?'
                }
              },
            ]}
          >
            <div className={scss["programs__inner"]}>
              <div className={scss["programs__items"]}>
                {generalPrograms.map((program, index) => {
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
          </TopInner>
        </Container>
      </section>

      <ProgramsModal programs={programs} />
    </>
  );
};
