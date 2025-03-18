import React from "react";
import "./Button.css";

export type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void,
  children: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={ onClick }>
      { children }
    </button>
  );
}

export default Button;
