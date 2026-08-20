import { Container, Swiper } from "@/shared/ui/index.ui";

import { TeamCard } from "@/entities/team/ui";

import { TEAMS_ITEMS } from "@/shared/config/teams.config";

import scss from './TeamsSection.module.scss'

export const TeamsSection = async () => {
  return (
    <>
      <section className={scss["teams"]}>
        <Container>
          <div className={scss["teams__inner"]}>
            <div className={scss["teams__top"]}>
              <h2 className="h4 font-text-second">Команда</h2>
            </div>

            <div className={scss["teams__items"]}>
              <Swiper
                config={{
                  slidesPerView: 4,
                  spaceBetween: 20,
                }}
                items={TEAMS_ITEMS.map((team) => (
                  <TeamCard key={team.id} card={{ ...team }} />
                ))}
                pagination
                arrows
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
