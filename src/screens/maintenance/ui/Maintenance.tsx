import { Container } from "@/shared/ui/container/Container";

import scss from "./Maintenance.module.scss";

export const Maintenance = () => {
  return (
    <section className={scss.maintenance}>
      <Container>
        <div className={scss.maintenance__inner}>
          <p className="p3 uppercase-text primary-color-70">
            Сайт временно недоступен
          </p>

          <h1 className="h2 font-text-second">
            Мы вносим изменения и поднимаем собственные серверы
          </h1>

          <p className="p1">Всё будет готово 2 ноября.</p>
        </div>
      </Container>
    </section>
  );
};

export default Maintenance;
