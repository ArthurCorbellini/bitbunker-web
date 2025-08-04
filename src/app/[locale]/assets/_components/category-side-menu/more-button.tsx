import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AssetCategory } from "@/core/types/asset-category"
import { MoreHorizontal, PenIcon, Trash2Icon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { FormDialogContent } from "./form-dialog-content"

interface Props {
  className?: string,
  category?: AssetCategory,
}

export const MoreButton = ({
  className,
  category
}: Props) => {
  const t = useTranslations("categoryMenu");
  const [dialogType, setDialogType] = useState<"update" | "delete" | "none">("none");
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  }

  const handleDialogContent = () => {
    switch (dialogType) {
      case "update":
        return (
          <FormDialogContent
            editAssetCategory={category}
            closeDialog={closeDialog} />
        );
      case "delete":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon" className={className}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setDialogType("update")}>
              <PenIcon />
              {t("edit")}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setDialogType("delete")}>
              <Trash2Icon />
              {t("delete")}
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {handleDialogContent()}
    </Dialog>
  )
}