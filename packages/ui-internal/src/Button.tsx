import React from "react";

interface IButton extends React.PropsWithChildren {
  label: string;
  color?: string;
}

const Button = ({ label, color = "#0e88fa" }: IButton) => {
  return (
    <button
      style={{
        padding: "12px 28px",
        borderRadius: "50px",
        border: "none",
        backgroundColor: color,
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default Button;
