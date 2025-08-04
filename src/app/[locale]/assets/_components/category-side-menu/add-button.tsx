import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { SaveDialog } from "./save-dialog"

export const AddButton = () => {
  const t = useTranslations("categoryMenu");
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenCreate(true)}>
        <Plus /> {t("addButton")}
      </Button>

      <SaveDialog open={openCreate} setOpen={setOpenCreate} />
    </>
  )
}