"use client";

import * as React from "react";
import { experimental_useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { pending } = experimental_useFormStatus();

  return (
    <button
      className={twMerge(
        "inline-flex w-full items-center justify-center rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      disabled={props.disabled || pending}
      ref={ref}
      {...props}
    >
      {pending && (
        <div className="mr-1" role="status">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-background border-r-transparent" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {props.children}
    </button>
  );
});
Button.displayName = "Button";
