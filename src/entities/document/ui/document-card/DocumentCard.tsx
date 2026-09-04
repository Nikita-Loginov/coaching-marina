"use client";

import { useEffect, useState } from "react";

import type { DocumentItem } from "../../model/document.types";

import {
  getFileFormat,
  getFileSize,
  downloadFile,
} from "@/shared/utils/document.utils";

import { Icons } from "@/shared/icons/index.icons";
import { Button } from "@/shared/ui/index.ui";

import scss from "./DocumentCard.module.scss";

interface DocumentCardProps {
  document: DocumentItem;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const [fileSize, setFileSize] = useState("");

  useEffect(() => {
    getFileSize(document.file).then(setFileSize);
  }, [document.file]);

  const fileFormat = getFileFormat(document.file);

  return (
    <div className={scss["document-card"]}>
      <div className={scss["document-card__top"]}>
        <div className={scss["document-card__header"]}>
          <div className={scss["document-card__icon"]}>
            <Icons.FileIcon />
          </div>

          <div className={scss["document-card__info"]}>
            <p className="p4 medium-font">{fileFormat}</p>

            <p className="p4">{fileSize}</p>
          </div>
        </div>

        <div className={scss["document-card__block"]}>
          <p className="p1">{document.name}</p>

          <div className="textbox textbox--second">
            {document.description.map((item) => (
              <p className="p3" key={item}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={scss["document-card__footer"]}>
        <div className={scss["document-card__btns"]}>
          <Button
            theme="secondary"
            animationIconHover="default"
            iconLeft={<Icons.ArrowDowloadIcon />}
            iconSize="small"
            onClick={() => downloadFile(document.file, document.name)}
          >
            <p className="p3">Скачать</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
