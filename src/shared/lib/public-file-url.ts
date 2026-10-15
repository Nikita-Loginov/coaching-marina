const BLOB_HOST = "tymlucxhly0ozhzv.public.blob.vercel-storage.com";

const encodePathPart = (part: string) => {
  try {
    return encodeURIComponent(decodeURIComponent(part));
  } catch {
    return encodeURIComponent(part);
  }
};

export const toPublicFileUrl = (file: string) => {
  if (!file.startsWith("https://")) {
    return file;
  }

  try {
    const url = new URL(file);

    if (!url.hostname.endsWith(".public.blob.vercel-storage.com")) {
      return file;
    }

    const path = url.pathname.split("/").filter(Boolean).map(encodePathPart).join("/");

    return `/files/${path}${url.search}`;
  } catch {
    return file;
  }
};

export const blobUrlFromPublicPath = (path: string[]) => {
  if (path.length === 0 || path.some((part) => part === "" || part === "." || part === "..")) {
    return null;
  }

  return `https://${BLOB_HOST}/${path.map(encodePathPart).join("/")}`;
};
