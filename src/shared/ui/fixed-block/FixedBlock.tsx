import { Cookie } from "./parts/cookie/Cookie";

import scss from "./FixedBlock.module.scss";

export const FixedBlock = () => {
  return (
    <div className={scss["fixed-block"]}>
      <Cookie />
    </div>
  );
};
