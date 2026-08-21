import { AdminTop } from "../admin-top/AdminTop";

import scss from "./AdminContent.module.scss";

interface AdminContentProps {
  children?: React.ReactNode;
  title: string;
  text: string;
  linkTo: string;
  linkLabel?: string
}

export const AdminContent = ({
  children,
  title,
  text,
  linkTo,
  linkLabel = 'Добавить' 
}: AdminContentProps) => {
  return (
    <section className={scss["admin-content"]}>
      <AdminTop title={title} text={text} linkTo={linkTo} linkLabel={linkLabel}/>

      {children}
    </section>
  );
};

export default AdminContent;
