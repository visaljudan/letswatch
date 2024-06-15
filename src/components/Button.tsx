import React, { ReactNode } from "react";

interface ButtonLinkProps {
  href?: string;
  icon?: ReactNode;
  text?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, icon, text }) => {
  return (
    <div className="relative my-2 border border-secondary rounded bg-transparent py-1 ">
      {icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-transparent">
          {icon}
        </span>
      )}
      <div className={` bg-transparent ${icon ? "pl-10 px-2" : ""}`}>
        <a className="bg-transparent" href={href}>
          {text}
        </a>
      </div>
    </div>
  );
};

interface ButtonActionProps {
  onClick?: () => void;
  onSubmit?: () => void;
  icon?: ReactNode;
  text?: string;
  disabled?: boolean; // New prop for disabled state
}

export const ButtonAction: React.FC<ButtonActionProps> = ({
  onClick,
  onSubmit,
  icon,
  text,
  disabled = false, // Default value for disabled prop
}) => {
  return (
    <div className="relative my-2 mx-0 bg-transparent">
      {icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-transparent">
          {icon}
        </span>
      )}
      <button
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
        className={`flex items-center bg-aprimary border hover:border py-1 px-2  rounded hover:bg-primary focus:outline-none focus:shadow-outline ${
          icon ? "pl-10" : ""
        }`}
      >
        {text}
      </button>
    </div>
  );
};
