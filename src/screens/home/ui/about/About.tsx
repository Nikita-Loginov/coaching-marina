import Image from "next/image";

import { Container, TopInner } from "@/shared/ui/index.ui";

import { PERSON_CONFIG } from "@/shared/config/person.config";

import scss from "./About.module.scss";

export const About = () => {
  const { aboutInfo, fullname, post } = PERSON_CONFIG;

  return (
    <section className={scss["about"]} id="about">
      <Container>
        <TopInner
          items={[
            {
              label: "Обо мне",
            },
          ]}
        >
          <div className={scss["about__inner"]}>
            <div className={scss["about__content"]}>
              <h2 className={scss["about__title"]}>{aboutInfo.title}</h2>

              <div className="textbox textbox--second">
                {aboutInfo.desc.map((text, index) => {
                  return <p key={index}>{text}</p>;
                })}
              </div>
            </div>

            <div className={scss["about__img-box"]}>
              <div className={scss["about__img-cards"]}>
                <div className={scss["about__img-card"]}>
                  <p className="p2 font-text-second">{fullname}</p>

                  <div className="textbox textbox--second">
                    <p className="p2">{post}</p>
                  </div>
                </div>
              </div>

              <div className={scss["about__img"]}>
                <Image src={aboutInfo.images[0]} alt={`${fullname}`} />
              </div>
            </div>
          </div>
        </TopInner>
      </Container>
    </section>
  );
};

export default About;