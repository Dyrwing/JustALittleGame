import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="mt-2 bg-gray-700 w-1/4 p-2 rounded cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
