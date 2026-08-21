import { useModalStore } from "@/shared/store/modal/modal.store";
import { Button } from "@/shared/ui/index.ui";

import type { ButtonProps } from "@/shared/ui/index.ui";

export const ContactMessageBtn = ({
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const { open } = useModalStore();

  return (
    <Button
      {...props}
      onClick={() => {
        onClick?.();

        open("contact", {});
      }}
    >
      {children}
    </Button>
  );
};
