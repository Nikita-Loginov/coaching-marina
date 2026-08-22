import { Container, TopInner, Swiper } from "@/shared/ui/index.ui";

import { CertificateCard } from "@/entities/certificate/ui";

import { CERTIFICATE_CARDS } from "@/shared/config/certificates.config";

import scss from "./CertificatesSection.module.scss";

export const CertificatesSection = () => {
  const certificatesSwiperItems = [...CERTIFICATE_CARDS]
    .sort((a, b) => Number(b.year) - Number(a.year))
    .map((certificate) => (
      <CertificateCard key={certificate.id} card={{ ...certificate }} />
    ));

  return (
    <section className={scss["certificates-section"]}>
      <Container>
        <TopInner
          items={[
            {
              label: "Мои сертификаты",
              title: {
                label: "Непрерывное",
                labelAccent: "развитие экспертизы",
              },
            },
          ]}
        >
          <div className={scss["certificates-section__content"]}>
            <Swiper
              config={{
                spaceBetween: 20,
                slidesPerView: 1,
                breakpoints: {
                  1024: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                },
              }}
              arrows
              items={certificatesSwiperItems}
              grid="three"
            />
          </div>
        </TopInner>
      </Container>
    </section>
  );
};
