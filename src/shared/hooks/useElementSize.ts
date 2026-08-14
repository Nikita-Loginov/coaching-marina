"use client";

import { useEffect } from "react";

interface UseElementSizeProps {
  ref: React.RefObject<HTMLElement | null>;
  varName: string;
}

export const useElementSize = ({ ref, varName }: UseElementSizeProps) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const observer = new ResizeObserver(() => {
      const { offsetHeight } = element;

      document.documentElement.style.setProperty(
        `--${varName}`,
        `${offsetHeight}px`
      );
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, varName]);

  return;
};
