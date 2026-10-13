"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import classNames from "classnames";

import { apiClient } from "@/shared/api/client";
import { uploadAdminFile } from "@/shared/lib/upload-file.client";

import { Button } from "../index.ui";

import scss from "./ImageUpload.module.scss";


interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  error?: string;
}

export const ImageUpload = ({ value, onChange, label, error }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError("");

      onChange(await uploadAdminFile(file, { image: true }));
    } catch (error) {
      console.error("Ошибка загрузки изображения", error);
      setUploadError("Не удалось загрузить фото");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const removeImage = async () => {
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
      console.error("Ошибка удаления изображения", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={scss.upload}>
      {label && <p className="p2 primary-color-400">{label}</p>}

      <div className={scss["upload__contemt"]}>
        {value ? (
          <div className={scss["upload__preview"]}>
            <div className={scss["upload__img"]}>
              <Image src={value} alt="preview" fill />
            </div>

            <div className={scss["upload__btns"]}>
              <Button
                typeBtn="button"
                iconLeft={<X size={18} />}
                theme="remove"
                onClick={removeImage}
                disabled={isUploading}
              />
            </div>
          </div>
        ) : (
          <label className={scss["upload__box"]}>
            <Upload size={24} />

            <span>{isUploading ? "Загрузка..." : "Загрузить фото"}</span>

            <input type="file" accept="image/*" onChange={uploadImage} hidden />
          </label>
        )}
      </div>

      {(uploadError || error) && (
          <p className={classNames("p3", scss["upload__error"])}>{uploadError || error}</p>
        )}
    </div>
  );
};
