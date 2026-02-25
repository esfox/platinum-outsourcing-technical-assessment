import { cn } from "@/lib/utils"

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-muted-foreground",
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}
