import * as React from "react";
import { cn } from "../../lib/utils";

export const Checkbox = React.forwardRef(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-gray-300 text-black focus:ring-2 focus:ring-black",
        className
      )}
      {...props}
    />
  )
);

Checkbox.displayName = "Checkbox";
