import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AssetCategory } from "@/core/types/asset-category"
import { MoreHorizontal, PenIcon, Trash2Icon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { SaveDialog } from "./save-dialog"

interface Props {
  className?: string,
  category?: AssetCategory,
}

export const MoreButton = ({
  className,
  category
}: Props) => {
  const t = useTranslations("categoryMenu");
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon" className={className}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenUpdate(true)}>
            <PenIcon />
            {t("edit")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SaveDialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        editAssetCategory={category}
      />
    </>
  )
}