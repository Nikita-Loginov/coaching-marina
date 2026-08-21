// import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/index.ui";

import scss from "./AdminTop.module.scss";

interface AdminTopProps {
  title: string;
  text: string;
  linkTo: string;
  linkLabel?: string;
}

export const AdminTop = ({
  title,
  text,
  linkTo,
  linkLabel = "Добавить",
}: AdminTopProps) => {
  return (
    <div className={scss["admin-top"]}>
      <div className={scss["admin-top__block"]}>
        <h1 className="h4 semibold-font">{title}</h1>

        <p className="p2 primary-color-400">{text}</p>
      </div>

      <div className={scss["admin-top__block"]}>
        <div className={scss["admin-top__btns"]}>
          <Button
            as="link"
            ariaLabel={`Перейти к добавлению ${title}`}
            // size="medium"
            to={linkTo}
            iconSize="medium"
            // iconLeft={<Plus />}
          >
            <p className="p3">{linkLabel}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminTop;
