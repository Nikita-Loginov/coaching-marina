"use client";

import classNames from "classnames";

import { UploadProgress as UploadProgressState } from "@/shared/lib/upload-file.client";

import scss from "./UploadProgress.module.scss";

interface UploadProgressProps {
  kind: "photo" | "file";
  progress: UploadProgressState;
}

export const UploadProgress = ({ kind, progress }: UploadProgressProps) => {
  const subject = kind === "photo" ? "фото" : "документ";
  const title =
    progress.phase === "prepare"
      ? `Готовим ${subject}`
      : progress.phase === "save"
        ? `Сохраняем ${subject}`
        : `Загружаем ${subject}`;
  const hint =
    progress.phase === "prepare"
      ? kind === "photo"
        ? "Сначала уменьшаем фото, чтобы оно быстрее открывалось на сайте"
        : "Проверяем файл перед отправкой"
      : progress.phase === "save"
        ? "Части уже на месте. Осталось собрать файл — это последние секунды"
        : progress.total > 1
          ? progress.loaded === 0
            ? `Сейчас уйдёт первая часть из ${progress.total}. Страницу закрывать не нужно`
            : `Отправлено ${progress.loaded} из ${progress.total}. Страницу закрывать не нужно`
          : "Файл уже уходит. Страницу закрывать не нужно";

  return (
    <div className={scss.progress}>
      <div className={scss.head}>
        <span className="p3">{title}</span>
        <span className={scss.percent}>{progress.percent}%</span>
      </div>

      <div
        className={scss.track}
        role="progressbar"
        aria-valuenow={progress.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title}
      >
        <div
          className={classNames(scss.bar, progress.percent === 0 && scss.barIndeterminate)}
          style={progress.percent === 0 ? undefined : { width: `${progress.percent}%` }}
        />
      </div>

      <p className={classNames("p3", scss.hint)}>{hint}</p>
    </div>
  );
};
