
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "relative bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "relative overflow-hidden text-white shadow-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-gradient-start before:to-gradient-end before:opacity-100 hover:before:opacity-90 [&>span]:relative [&>span]:z-10",
        "gradient-green": "relative overflow-hidden text-white shadow-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-gradient-green-start before:to-gradient-green-end before:opacity-100 hover:before:opacity-90 [&>span]:relative [&>span]:z-10",
        "gradient-blue": "relative overflow-hidden text-white shadow-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-gradient-blue-start before:to-gradient-blue-end before:opacity-100 hover:before:opacity-90 [&>span]:relative [&>span]:z-10",
        "gradient-orange": "relative overflow-hidden text-white shadow-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-gradient-orange-start before:to-gradient-orange-end before:opacity-100 hover:before:opacity-90 [&>span]:relative [&>span]:z-10",
        "gradient-pink": "relative overflow-hidden text-white shadow-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-gradient-pink-start before:to-gradient-pink-end before:opacity-100 hover:before:opacity-90 [&>span]:relative [&>span]:z-10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "h-12 rounded-xl px-8 text-base",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isGradient = variant?.includes("gradient");
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      >
        {isGradient ? <span>{children}</span> : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
