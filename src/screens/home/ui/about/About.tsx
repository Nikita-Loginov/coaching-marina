import Image from "next/image";

import { getPerson } from "@/entities/person/model/person.queries";

import { Container, TopInner } from "@/shared/ui/index.ui";

import scss from "./About.module.scss";

export const About = async () => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  const { about, fullname, post } = person;

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
              <h2 className={scss["about__title"]}>
                {about.title}
              </h2>

              <div className="textbox textbox--second">
                {about.desc.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>

            <div className={scss["about__img-box"]}>
              <div className={scss["about__img-cards"]}>
                <div className={scss["about__img-card"]}>
                  <p className="p2 font-text-second">
                    {fullname}
                  </p>

                  <div className="textbox textbox--second">
                    <p className="p2">{post}</p>
                  </div>
                </div>
              </div>

              <div className={scss["about__img"]}>
                <Image
                  src={about.images[0]}
                  alt={fullname}
                  fill
                />
              </div>
            </div>
          </div>
        </TopInner>
      </Container>
    </section>
  );
};

export default About;