import React, { useState } from "react";
import { Logo } from "../../components/Logo"; // Adjust import for Logo
import NavbarLink from "../../data/navbarLink.json"; // Adjust import for JSON data
import Input from "../../components/Input";
import { FaCompass, FaSearch, FaUserAlt } from "react-icons/fa";
import { Link } from "../../components/Link";

export const HeaderLogo = () => {
  return (
    <div className="w-full h-20 border-b-2 border-aprimary flex items-center justify-center mb-2 ">
      <Logo />
    </div>
  );
};

export const Header = () => {
  const [formData, setFormData] = useState({
    search: "",
  });

  const handleChange = (inputType: string, newValue: string) => {
    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };
  return (
    <div className="w-full h-20 border-b-2 border-aprimary flex items-center justify-between p-3 mb-4  ">
      <div className="flex items-center">
        <form>
          <Input
            type="text"
            value={formData.search}
            onChange={(value) => handleChange("search", value)}
            placeholder="Search..."
            icon={<FaSearch />}
          />
        </form>
        <div className="m-2">
          <Link url="/" title="Explore" icon={<FaCompass />} />
        </div>
      </div>
      <Logo />
      <div className="flex items-center">
        <Link url="signup" title="Account" icon={<FaUserAlt />} />
      </div>
    </div>
  );
};
