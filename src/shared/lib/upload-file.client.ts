import { apiClient } from "@/shared/api/client";

const CHUNK_SIZE = 16 * 1024;

export type UploadProgress = {
  phase: "prepare" | "upload" | "save";
  percent: number;
  loaded: number;
  total: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const prepareImage = (file: File) =>
  new Promise<File>((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxSide = 2000;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        resolve(file);
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);

          if (!blob) {
            resolve(file);
            return;
          }

          const name = file.name.replace(/\.[^.]+$/, "") || "photo";
          resolve(new File([blob], `${name}.webp`, { type: "image/webp" }));
        },
        "image/webp",
        0.82
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    image.src = objectUrl;
  });

const postChunk = async (
  file: File,
  uploadId: string,
  index: number,
  total: number
) => {
  const chunk = file.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);
  const formData = new FormData();

  formData.append("mode", "chunk");
  formData.append("uploadId", uploadId);
  formData.append("index", String(index));
  formData.append("total", String(total));
  formData.append("file", chunk, file.name);

  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await apiClient.post("/admin/upload", formData, {
        timeout: 30000,
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: [(data) => data],
      });
      return;
    } catch (error) {
      lastError = error;
      await sleep(400 * (attempt + 1));
    }
  }

  throw lastError;
};

export const uploadAdminFile = async (
  file: File,
  options?: { image?: boolean; onProgress?: (progress: UploadProgress) => void }
) => {
  const report = (progress: UploadProgress) => options?.onProgress?.(progress);

  report({ phase: "prepare", percent: 0, loaded: 0, total: 0 });

  const prepared = options?.image ? await prepareImage(file) : file;
  const uploadId = crypto.randomUUID();
  const total = Math.max(1, Math.ceil(prepared.size / CHUNK_SIZE));

  report({ phase: "upload", percent: 5, loaded: 0, total });

  for (let index = 0; index < total; index += 1) {
    await postChunk(prepared, uploadId, index, total);
    report({
      phase: "upload",
      percent: 5 + Math.round(((index + 1) / total) * 87),
      loaded: index + 1,
      total,
    });
  }

  report({ phase: "save", percent: 96, loaded: total, total });

  const { data } = await apiClient.post(
    "/admin/upload",
    {
      mode: "complete",
      uploadId,
      total,
      filename: prepared.name,
      contentType: prepared.type || "application/octet-stream",
    },
    { timeout: 60000 }
  );

  report({ phase: "save", percent: 100, loaded: total, total });

  return data.url as string;
};
