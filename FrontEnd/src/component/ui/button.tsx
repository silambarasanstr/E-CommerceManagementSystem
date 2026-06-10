import React from "react";

type ButtonProps = {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = React.memo(
  ({
    onClick,
    type = "button",
    className = "",
    disabled = false,
    children,
  }: ButtonProps) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-2 py-1 rounded text-md ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer "
        } ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default Button;
