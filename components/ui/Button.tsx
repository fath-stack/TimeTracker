"use client";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React, { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = 'primary' | 'outline' | undefined; // example variants, adjust as needed
type Size = 'sm' | 'md' | 'lg' | undefined; // example sizes, adjust as needed

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode | undefined;
}

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600",
        outline:
          "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);


export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}

