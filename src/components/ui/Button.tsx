import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = "px-6 py-2 rounded-full font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-[var(--color-brand-blue)] text-white hover:bg-blue-600 shadow-md",
    secondary: "bg-[var(--color-brand-pickle)] text-white hover:bg-green-700",
    outline: "border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] hover:bg-blue-50"
  };
  
  return (
    <button className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
