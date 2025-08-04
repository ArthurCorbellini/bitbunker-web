import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { deleteAssetCategory } from "@/app/_actions/asset-category.action";
import { useToast } from "@/components/generic/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AssetCategory } from "@/core/types/asset-category";
import { useRouter } from "@/i18n/routing";

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void;
  category: AssetCategory,
}

export const DeleteDialog = ({
  category,
  open,
  setOpen,
}: Props) => {
  const t = useTranslations("categoryMenu");
  const { successToast, handleApiErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleConfirm = () => {
    startTransition(() => {
      deleteAssetCategory(category.id).then((res) => {
        if (res.success) {
          successToast(t("deleteToastDescription"));
          setOpen(false);
          router.push("/assets");
        } else
          handleApiErrorToast(res.error);
      });
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[33%]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <TriangleAlert size={32} />
            {t("deleteTitle", { value: category.name })}
          </DialogTitle>
          <DialogDescription>
            {t("deleteDescription")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)} >
            {t("cancel")}
          </Button>
          <Button variant={"destructive"} onClick={handleConfirm} disabled={isPending}>
            {isPending ? t("deleting") : t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}