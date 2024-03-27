import React from "react";

interface IButton extends React.PropsWithChildren {
  label: string;
}

const Button = ({ label }: IButton) => {
  return <button>{label}</button>;
};

export default Button;
