import * as React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
