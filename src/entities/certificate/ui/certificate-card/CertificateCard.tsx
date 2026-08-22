import classNames from "classnames";

import { Button } from "@/shared/ui/index.ui";

import type { CertificateItem } from "../../model/certificate.types";

import { Icons } from "@/shared/icons/index.icons";

import scss from "./CertificateCard.module.scss";

interface CertificateCardProps {
  card: CertificateItem;
}

export const CertificateCard = ({ card }: CertificateCardProps) => {
  const { name, desc, url, year, issued } = card;

  if (!url) return;

  return (
    <div className={scss["certificate-card"]}>
      <div className={scss["certificate-card__top"]}>
        <div className={scss["certificate-card__top-block"]}>
          <p className="p4 medium-font primary-color-40">{year}</p>
        </div>
      </div>

      <div className={scss["certificate-card__content"]}>
        <div className={scss["certificate-card__block"]}>
          <p className={scss["certificate-card__title"]}>{name}</p>

          <div className={scss['certificate-card__badges']}>
            <p className="p3">{issued}</p>
          </div>
        </div>

        <div className={scss["certificate-card__block"]}>
          <div className={classNames("textbox", "textbox--second")}>
            {desc.map((text, index) => {
              return <p className="p3" key={index}>{text}</p>;
            })}
          </div>
        </div>
      </div>

      <div className={scss["certificate-card__footer"]}>
        <div className={scss["certificate-card__btns"]}>
          <Button
            theme="flat"
            iconRight={<Icons.ArrowRight />}
            animationIconHover="right"
            as="link"
            to={url}
            target="_blank"
          >
            <p className="p3">Посмотреть сертификат</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
