import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<string, string> = {
      default: "bg-[#3087fe] text-white hover:bg-[#1a6bd8] shadow-md hover:shadow-lg",
      outline: "border-2 border-[#3087fe] text-[#3087fe] hover:bg-blue-50",
      ghost: "text-gray-600 hover:bg-gray-100",
    };

    const sizes: Record<string, string> = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
