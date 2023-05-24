"use client";

import * as React from "react";
import { experimental_useFormStatus } from "react-dom";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { pending } = experimental_useFormStatus();

  return (
    <button
      className="text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center rounded-md bg-primary p-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
