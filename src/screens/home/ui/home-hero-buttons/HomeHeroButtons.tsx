"use client";

import { Button } from "@/shared/ui/button/Button";
import { Icons } from "@/shared/icons/index.icons";
import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import scss from "./HomeHeroButtons.module.scss";

export const HomeHeroButtons = () => {
  return (
    <div className={scss["home-hero-buttons"]}>
      <ContactMessageBtn
        size="medium"
        theme="primary"
        iconRight={<Icons.ArrowRight />}
        iconSize="medium"
      >
        <p className="p2">Записаться на разговор</p>
      </ContactMessageBtn>

      <Button size="medium" theme="secondary" as="link" to="#philosophy">
        <p className="p2">Узнать подход</p>
      </Button>
    </div>
  );
};

export default HomeHeroButtons;
