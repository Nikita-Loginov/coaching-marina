"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { Button } from "@/shared/ui/index.ui";

import scss from "./Cookie.module.scss";

const COOKIE_NAME = "cookie-coaching";

export const Cookie = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(COOKIE_NAME);

    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(COOKIE_NAME, accepted ? "accepted" : "rejected");

    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={scss["cookie"]}
        >
          <div className={scss["cookie__header"]}>
            <p className={scss["cookie__title"]}>Мы используем файлы cookie</p>

            <div className="textbox textbox--second">
              <p className="p3">
                Файлы cookie помогают нам обеспечивать корректную работу сайта и
                улучшать ваш пользовательский опыт. Юридические документы
                доступны на странице{" "}
                <Link
                  href={"/svedeniya/obrazovatelnoj-organizacii"}
                  title="Сведения об образовательной организации"
                  aria-label="Перейти на страницу Сведения об образовательной организации"
                  className="link"
                >
                  «Сведения об образовательной организации»
                </Link>
                .
              </p>
            </div>
          </div>

          <div className={scss["cookie__footer"]}>
            <div className={scss["cookie__btns"]}>
              <Button size="medium" onClick={() => handleConsent(true)}>
                <p className="p3">Принять</p>
              </Button>

              <Button
                size="medium"
                theme="secondary"
                onClick={() => handleConsent(false)}
              >
                <p className="p3">Отклонить</p>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
