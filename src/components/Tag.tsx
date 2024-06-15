import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface TagProps {
  label?: string;
  onSelect: (label: string) => void;
  isSelected: boolean;
}

const Tag: React.FC<TagProps> = ({ label = "", onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(label);
  };

  return (
    <div
      className={`border border-aprimary px-4 py-1 m-2 flex items-center justify-center ${
        isSelected ? "bg-aprimary" : "bg-primary"
      }`}
      onClick={handleClick}
    >
      {isSelected ? (
        <>
          <p className="text-base mr-2 bg-aprimary">{label}</p>
          {/* <FaTimes className="bg-aprimary" /> */}
        </>
      ) : (
        <>
          <p className="text-base mr-2 flex items-center">{label}</p>
          {/* <FaCheck /> */}
        </>
      )}
    </div>
  );
};

export default Tag;
