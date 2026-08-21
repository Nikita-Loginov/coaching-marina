import {
  BREADCRUMB_MAP,
  BreadcrumbItem,
} from "@/widgets/admin-panel/model/breadcrumbs.config";

export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  if (BREADCRUMB_MAP[pathname]) {
    return BREADCRUMB_MAP[pathname];
  }

  return [
    { href: "/admin", label: "Главная" },
    { href: pathname, label: getPageTitle(pathname) },
  ];
};

const getPageTitle = (pathname: string): string => {
  const lastSegment = pathname.split("/").pop() || "";

  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
