export const getFileFormat = (file: string): string => {
  const cleanFile = file.split("?")[0];
  const extension = cleanFile.split(".").pop();

  return extension?.toUpperCase() || "FILE";
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  const size = bytes / Math.pow(1024, index);

  return `${parseFloat(size.toFixed(1))} ${units[index]}`;
};

export const getFileSize = async (file: string): Promise<string> => {
  try {
    const response = await fetch(file, {
      method: "HEAD",
    });

    if (!response.ok) {
      return "";
    }

    const contentLength = response.headers.get("content-length");

    if (!contentLength) {
      return "";
    }

    return formatFileSize(Number(contentLength));
  } catch {
    return "";
  }
};

export const downloadFile = (file: string, name?: string): void => {
  const link = document.createElement("a");

  link.href = file;
  link.download = name || file.split("/").pop() || "document";

  document.body.appendChild(link);
  link.click();
  link.remove();
};
