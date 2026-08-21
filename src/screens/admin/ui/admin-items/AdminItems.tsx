import classNames from "classnames";

import scss from "./AdminItems.module.scss";

interface AdminItemsProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminItems = ({ children, className }: AdminItemsProps) => {
  return <div className={classNames(scss["admin-items"], className)}>{children}</div>;
};

export default AdminItems;