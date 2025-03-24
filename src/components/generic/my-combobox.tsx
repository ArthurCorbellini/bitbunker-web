"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/utils/shadcn-utils"
import { Skeleton } from "../ui/skeleton"

interface Props {
  options: ComboboxOptions[],
  placeholder: string,
  emptyMessage?: string,
  isLoading?: boolean,
  onSelect?: (value: string) => void,
  onFocus?: () => void,
}

export interface ComboboxOptions {
  label: string,
  value: string,
}

export const MyCombobox = ({
  options,
  placeholder,
  emptyMessage,
  isLoading,
  onSelect,
  onFocus,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const onSelectHandle = (currentValue: string) => {
    if (onSelect) onSelect(currentValue);

    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          onClick={onFocus}
          className="w-full justify-between">
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            {isLoading ? (
              <div className="space-y-2 p-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => onSelectHandle(opt.value)}>
                      {opt.label}
                      <Check className={cn("ml-auto", value === opt.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
