// import { BookOpen, LucideIcon, MessageSquare, Users } from "lucide-react";

type ItemType = {
  to: string;
  label: string;
  // icon: LucideIcon;
};

export const ADMIN_SIDEBAR_ITEMS: ItemType[] = [
  { to: "/admin/programs", label: "Программы" },
  { to: "/admin/teams", label: "Команда" },
  { to: "/admin/reviews", label: "Отзывы" },
  { to: "/admin/orgs", label: "Информация о себе" },
];
