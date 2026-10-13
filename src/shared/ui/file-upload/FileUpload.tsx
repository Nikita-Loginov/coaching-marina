"use client";

import { useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import classNames from "classnames";

import { apiClient } from "@/shared/api/client";
import { uploadAdminFile } from "@/shared/lib/upload-file.client";

import { Button } from "../index.ui";

import scss from "./FileUpload.module.scss";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  error?: string;
  accept?: string;
}

export const FileUpload = ({
  value,
  onChange,
  label,
  error,
  accept = ".pdf,.doc,.docx",
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError("");

      onChange(await uploadAdminFile(file));
    } catch (error) {
      console.error("Ошибка загрузки файла", error);
      setUploadError("Не удалось загрузить файл");
    } finally {
      setIsUploading(false);

      event.target.value = "";
    }
  };

  const removeFile = async () => {
    if (!value) return;

    try {
      setIsUploading(true);

      await apiClient.delete("/admin/upload", {
        data: {
          url: value,
        },
      });

      onChange("");
    } catch (error) {
      console.error("Ошибка удаления файла", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={scss.upload}>
      {label && (
        <p className="p2 primary-color-400">
          {label}
        </p>
      )}

      <div className={scss["upload__content"]}>
        {value ? (
          <div className={scss["upload__file"]}>
            <div className={scss["upload__file-info"]}>
              <FileText size={24} />

              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="p3"
              >
                Открыть документ
              </a>
            </div>

            <Button
              typeBtn="button"
              iconLeft={<X size={18} />}
              theme="remove"
              onClick={removeFile}
              disabled={isUploading}
            />
          </div>
        ) : (
          <label className={scss["upload__box"]}>
            <Upload size={24} />

            <span>
              {isUploading
                ? "Загрузка..."
                : "Загрузить документ"}
            </span>

            <input
              type="file"
              accept={accept}
              onChange={uploadFile}
              hidden
            />
          </label>
        )}
      </div>

      {(uploadError || error) && (
        <p
          className={classNames(
            "p3",
            scss["upload__error"]
          )}
        >
          {uploadError || error}
        </p>
      )}
    </div>
  );
};