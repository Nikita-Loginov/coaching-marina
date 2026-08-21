"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import { Button, Logo } from "@/shared/ui/index.ui";

import { ADMIN_SIDEBAR_ITEMS } from "./config/admin-sidebar-items.config";

import scss from "./AdminPanelSidebar.module.scss";

export const AdminPanelSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={scss["admin-panel-sidebar"]}>
      <div className={scss["admin-panel-sidebar__top"]}>
        <div className={scss["admin-panel-sidebar__top-block"]}>
          {/* <Logo as="icon" /> */}
        </div>

        <ul className={scss["admin-panel-sidebar__menu"]}>
          {ADMIN_SIDEBAR_ITEMS.map((link, index) => {
            const { to, label } = link;

            // const Icon = icon;

            const isActive = Boolean(to && pathname?.includes(to));

            return (
              <li
                className={scss["admin-panel-sidebar__menu-link"]}
                key={index}
              >
                <Button
                  theme="secondary"
                  to={to || "admin"}
                  as="link"
                  aria-label={`Перейти на страницу ${label}`}
                  className={classNames(
                    scss["admin-panel-sidebar__btn"],
                    isActive ? scss["active"] : null
                  )}
                  // iconLeft={<Icon />}
                  iconSize="small"
                >
                  <p className="p3">{label}</p>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={scss["admin-panel-sidebar__footer"]}>
        <div className={scss["admin-panel-sidebar__btns"]}>
          <SignOutButton redirectUrl="/sign-in">
            <Button
              theme="secondary"
              // size="ghost"
              iconLeft={<LogOut />}
              animationIconHover="left"
              iconSize="small"
            >
              <p className="p3">Выйти</p>
            </Button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
};
