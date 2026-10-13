import { apiClient } from "@/shared/api/client";

const CHUNK_SIZE = 16 * 1024;

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
      await apiClient.post("/admin/upload", formData, { timeout: 30000 });
      return;
    } catch (error) {
      lastError = error;
      await sleep(400 * (attempt + 1));
    }
  }

  throw lastError;
};

export const uploadAdminFile = async (file: File, options?: { image?: boolean }) => {
  const prepared = options?.image ? await prepareImage(file) : file;
  const uploadId = crypto.randomUUID();
  const total = Math.max(1, Math.ceil(prepared.size / CHUNK_SIZE));

  for (let index = 0; index < total; index += 1) {
    await postChunk(prepared, uploadId, index, total);
  }

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

  return data.url as string;
};
