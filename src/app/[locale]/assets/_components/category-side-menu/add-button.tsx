import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { FormDialog } from "./form-dialog"

export const AddButton = () => {
  const t = useTranslations("categoryMenu");
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenCreate(true)}>
        <Plus /> {t("addButton")}
      </Button>

      <FormDialog open={openCreate} setOpen={setOpenCreate} />
    </>
  )
}