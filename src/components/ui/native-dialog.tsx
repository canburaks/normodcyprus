import { forwardRef, type ComponentProps } from "react";
import { X } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export const NativeDialog = forwardRef<HTMLDialogElement, ComponentProps<"dialog">>(
  function NativeDialog({ children, className, ...props }, ref) {
    const { t } = useTranslation("common");
    return (
      <dialog ref={ref} className={cn("native-dialog", className)} {...props}>
        <form method="dialog" className="dialog-close">
          <Button type="submit" variant="ghost" size="icon" aria-label={t("close")}>
            <X aria-hidden="true" />
          </Button>
        </form>
        {children}
      </dialog>
    );
  },
);
