import * as React from "react";
import { cn } from "../../lib/utils";

export function Alert({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border border-gray-200 bg-white p-4 text-sm",
        className
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none", className)}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }) {
  return (
    <div className={cn("text-gray-600", className)} {...props} />
  );
}
