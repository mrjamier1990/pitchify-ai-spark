import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MultiSelectProps {
  options: { value: string; label: string; icon?: React.ReactNode }[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  variant?: "chips" | "cards"
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
  variant = "chips"
}: MultiSelectProps) {
  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(s => s !== value)
      : [...selected, value]
    onChange(newSelected)
  }

  const removeOption = (value: string) => {
    onChange(selected.filter(s => s !== value))
  }

  if (variant === "cards") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => {
            const isSelected = selected.includes(option.value)
            return (
              <Button
                key={option.value}
                variant={isSelected ? "default" : "outline"}
                onClick={() => toggleOption(option.value)}
                className={cn(
                  "justify-start h-auto p-4 text-left",
                  isSelected && "bg-primary text-primary-foreground"
                )}
              >
                {option.icon && <span className="mr-3">{option.icon}</span>}
                <span>{option.label}</span>
              </Button>
            )
          })}
        </div>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((value) => {
              const option = options.find(o => o.value === value)
              return (
                <Badge key={value} variant="secondary" className="pr-1">
                  {option?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1"
                    onClick={() => removeOption(value)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <Button
              key={option.value}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleOption(option.value)}
              className={cn(
                "h-auto px-3 py-2",
                isSelected && "bg-primary text-primary-foreground"
              )}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </Button>
          )
        })}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const option = options.find(o => o.value === value)
            return (
              <Badge key={value} variant="secondary" className="pr-1">
                {option?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 ml-1"
                  onClick={() => removeOption(value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}