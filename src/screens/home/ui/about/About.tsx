import Image from "next/image";
import classNames from "classnames";
import { Check } from "lucide-react";

import { Images } from "@/shared/images/index.images";

import { getPerson } from "@/entities/person/model/person.queries";

import { Container, TopInner, ListDots } from "@/shared/ui/index.ui";

import { preventOrphans } from "@/shared/utils/preventOrphans.util";

import scss from "./About.module.scss";


export const About = async () => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  const { about, fullname, post, name, middlename } = person;

  const middle = Math.ceil(about.list.length / 2);

  const firstList = about.list.slice(0, middle);
  const secondList = about.list.slice(middle);

  return (
    <section className={scss["about"]} id="about">
      <Container>
        <div className={scss["about__inner"]}>
          <div className={scss["about__top"]}>
            <p className="p1 medium-font primary-color-70">{post}</p>

            <p className="h2 font-text-second">
              {name} {middlename}
            </p>
          </div>

          <div className={scss["about__content"]}>
            <div className={scss["about__info"]}>
              <ListDots
                items={firstList.map((label) => ({
                  as: "text",
                  label,
                  icon: <Check />,
                }))}
              />

              <div className={scss["about__img"]}>
                <Image src={Images.MarinaThree} alt={fullname} fill />
              </div>

              <ListDots
                items={secondList.map((label) => ({
                  as: "text",
                  label,
                  icon: <Check />,
                }))}
              />
            </div>

            <div className={scss["about__quote"]}>
              <div className={scss["about__quote-content"]}>
                {/* <p className={classNames("p3", scss["about__quote-head"])}>
                  «{about.title}
                </p> */}
                {about.desc.map((text, index) => {
                  return (
                    <p className="p2" key={index}>
                      {index === 0 ? "«" : null}
                      {preventOrphans(text)}
                      {index === about.desc.length - 1 ? "»" : null}
                    </p>
                  );
                })}{" "}
              </div>

              <div className={scss["about__quote-footer"]}>
                <p className="p2">
                  - {name} {middlename}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
