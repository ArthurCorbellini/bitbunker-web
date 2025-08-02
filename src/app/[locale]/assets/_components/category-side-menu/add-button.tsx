import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { FormDialogContent } from "./form-dialog-content"

export const AddButton = () => {
  const t = useTranslations("categoryMenu");
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> {t("addButton")}
        </Button>
      </DialogTrigger>
      <FormDialogContent closeDialog={closeDialog} />
    </Dialog>
  )
}