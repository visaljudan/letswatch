import React, { FormEvent, useState } from "react";
import AppLayout from "../layout/AppLayout";
import { Label, LabelInput } from "../components/Label";
import { useNavigate } from "react-router-dom";
import { ButtonAction } from "../components/Button";
import {
  FaArrowAltCircleLeft,
  FaArrowLeft,
  FaEnvelope,
  FaKey,
  FaKeybase,
  FaRegArrowAltCircleLeft,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import Input from "../components/Input";
import { Link, LinkButton } from "../components/Link";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface userInformation {
  username: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}
const Setting = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.user
  );
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
  });

  const [formDataPassword, setFormDataPassword] = useState({
    password: "",
    newPassword: "",
    cNewPassword: "",
  });

  const [message, setMessage] = useState<any>({});
  const [err, setErr] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (inputType: keyof userInformation, newValue: string) => {
    setFormData({
      ...formData,
      [inputType]: newValue,
    });

    setFormDataPassword({
      ...formDataPassword,
      [inputType]: newValue,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center w-1/2 m-auto">
        <span className="flex items-center">
          <a href="/profile" className="absolute left-10">
            <FaArrowLeft />
          </a>
          <Label textLabel="Profile" />
        </span>
        <div className="my-4">
          {/* <img className="w-32 h-32 rounded-full border" src={user.profile} /> */}
        </div>
        <Label htmlFor="" textLabel="Edit Your Informatuon" />
        <p className="text-aprimary font-bold">Username and Email</p>
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <LabelInput htmlFor="username" textLabel="Username " />
          <Input
            type="text"
            value={formData.username}
            onChange={(value) => handleChange("username", value)}
            placeholder="Username"
            icon={<FaUser />}
          />
          <LabelInput htmlFor="email" textLabel="Email" />
          <Input
            type="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            placeholder="Email"
            icon={<FaEnvelope />}
          />
          <ButtonAction
            text="Save"
            icon={<FaSignInAlt className="bg-transparent" />}
          />
        </form>
        <p className="text-aprimary font-bold mt-4">Password</p>
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <LabelInput
            htmlFor="current_password"
            textLabel="Current Password "
          />
          <Input
            type="password"
            value={formDataPassword.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="Enter Current Password"
            icon={<FaKey />}
          />
          <LabelInput htmlFor="new_password" textLabel="New Password" />
          <Input
            type="password"
            value={formDataPassword.newPassword}
            onChange={(value) => handleChange("newPassword", value)}
            placeholder="Enter New Password"
            icon={<FaKey />}
          />
          <LabelInput
            htmlFor="confirm_password"
            textLabel="Comfirm New Password"
          />
          <Input
            type="password"
            value={formDataPassword.cNewPassword}
            onChange={(value) => handleChange("confirmNewPassword", value)}
            placeholder="Enter New Password Agian"
            icon={<FaKey />}
          />
          <ButtonAction
            text="Save"
            icon={<FaSignInAlt className="bg-transparent" />}
          />
        </form>
        <span className="flex items-center mr-40 ml-5">
          <p className="my-2">Forgot Password? </p>
          <Link url="reset-password" title="Reset Password" />
        </span>
      </div>
    </AppLayout>
  );
};

export default Setting;
