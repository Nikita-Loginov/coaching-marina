import { useModalStore } from "@/store/modal/modal.store";
import { Button } from "@/shared/ui/index.ui";

import type { ButtonProps } from "@/shared/ui/index.ui";

export const ContactMessageBtn = ({ children, ...props }: ButtonProps) => {
  const { open } = useModalStore();

  return (
    <Button
      {...props}
      onClick={() => {
        open("contact", {});
      }}
    >
      {children}
    </Button>
  );
};
