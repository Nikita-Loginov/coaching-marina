import { Container, Swiper } from "@/shared/ui/index.ui";

import { TeamCard } from "@/entities/team/ui";

import { TEAMS_ITEMS } from "@/shared/config/teams.config";

import { getTeams } from "@/entities/team/model/team.queries";

import scss from './TeamsSection.module.scss'


export const TeamsSection = async () => {
  const teams = await getTeams();
  
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
                  slidesPerView: 1,
                  spaceBetween: 20,
                  breakpoints: {
                    1024: {
                      slidesPerView: 4,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    480: {
                      slidesPerView: 2,
                    }
                  }
                }}
                items={teams.map((team) => (
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
