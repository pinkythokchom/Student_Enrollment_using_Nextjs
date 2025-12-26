import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      type = "button",
      variant = "primary",
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-black text-white hover:bg-gray-800 active:scale-[0.98]",
      outline:
        "border border-gray-300 bg-white hover:bg-gray-100",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
