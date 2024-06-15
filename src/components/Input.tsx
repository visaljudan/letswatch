import React, { useState, ChangeEvent, FormEvent } from "react";

interface InputProps {
  type: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode; // Optional icon prop
  secound_icon?: React.ReactNode;
  pattern?: string;
  id?: string; // Pattern for input validation
  required?: boolean;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  icon,
  pattern,
  id,
  required,
  secound_icon,
  onClick,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    // If pattern is provided, apply validation
    if (pattern) {
      // If input type is password or email, trim spaces
      if (id === "password" || id === "email") {
        newValue = newValue.trim();
      } else if (id === "username") {
        // If input type is username
        // Test the input value against the alphanumeric regex
        if (!alphanumericRegex.test(newValue) && newValue !== "") {
          // If the input value doesn't match the alphanumeric pattern and it's not empty, don't update the value
          return;
        }
      }

      // Validate input against pattern
      if (new RegExp(pattern).test(newValue) || newValue === "") {
        onChange(newValue);
      }
    } else {
      // If no pattern provided, allow any input
      onChange(newValue);
    }
  };

  return (
    <div className="relative my-2">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-0 m-4 bg-transparent">
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`p-2 text-base border border-secondary bg-transparent w-full text-text rounded ${
          icon ? "pl-10 fill-aprimary" : ""
        }`}
        pattern={pattern} // Set pattern attribute for input validation
        required={required}
      />
      {secound_icon && (
        <a
          onClick={onClick} // Assign onclick handler
          className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4 m-0 bg-transparent"
        >
          {secound_icon}
        </a>
      )}
    </div>
  );
};

export default Input;
