import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FaAngleLeft,
  FaCheck,
  FaEnvelope,
  FaKey,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HeaderLogo } from "../../layout/Header";
import { Link, LinkButton } from "../../components/Link";
import { Label, LabelInput } from "../../components/Label";
import Input from "../../components/Input";
import { ButtonAction } from "../../components/Button";
import Footer from "../../layout/Footer";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  cPassword: string;
  role_id: number;
}

const SignUpAdmin = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    username: "",
    email: "",
    password: "",
    cPassword: "",
    role_id: 1,
  });

  const [message, setMessage] = useState<any>({});
  const [errLength, setErrLength] = useState<boolean>(false);
  const [errMatch, setErrMatch] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (inputType: keyof SignUpForm, newValue: string) => {
    if (inputType === "password") {
      if (newValue.length < 6 && newValue.length > 0) {
        setErrLength(true);
        setErrMatch(false);
        setMessage("Password must be at least 6 characters long.");
      } else {
        setErrLength(false);
        setErrMatch(false);
        setMessage("");
      }
    }

    if (inputType === "cPassword") {
      if (newValue !== formData.password) {
        setErrLength(false);
        setErrMatch(true);
        setMessage("Passwords do not match.");
      } else {
        setErrLength(false);
        setErrMatch(false);
        setMessage("");
      }
    }

    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (formData.password !== formData.cPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false) {
        setErr(true);
        setMessage(data.message);
        return;
      }

      setErr(false);
      navigate("/");
    } catch (error) {
      setErr(true);
      setMessage("An error occurred. Please try again."); // Handle error
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className="flex flex-col justify-center items-center my-4">
        <LinkButton url="/" icon={<FaAngleLeft className="button-link" />} />
        <Label htmlFor="" textLabel="Sign Up" />
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <LabelInput htmlFor="username" textLabel="Username" />
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(value) => handleChange("username", value)}
            placeholder="Enter username"
            icon={<FaUser />}
            pattern="[a-zA-Z0-9]*"
          />

          <LabelInput htmlFor="email" textLabel="Email" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            placeholder="Enter email"
            icon={<FaEnvelope />}
          />
          <LabelInput htmlFor="password" textLabel="Password" />

          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="Enter Password"
            icon={<FaKey />}
          />
          {errLength ? <span className="text-danger">{message}</span> : ""}
          <LabelInput htmlFor="cPassword" textLabel="Confirm Password" />
          <Input
            id="cPassword"
            type="password"
            value={formData.cPassword}
            onChange={(value) => handleChange("cPassword", value)}
            placeholder="Enter Confirm Password"
            icon={<FaCheck />}
            pattern="[^\s]*"
          />
          {errMatch ? <span className="text-danger">{message}</span> : ""}
          <ButtonAction
            text="Sign Up"
            icon={<FaUser className="bg-transparent" />}
          />
        </form>
        {err ? <span className="text-danger">{message}</span> : ""}
        <span className="w-96">
          <span className="flex items-center">
            <p className="my-2">Have an account?</p>
            <Link url="signin" title="Sign In" />
          </span>
          <span className="flex items-center">
            <p className="my-2">Forgot Password? </p>
            <Link url="reset-password" title="Reset Password" />
          </span>
        </span>
      </div>
      <Footer />
    </>
  );
};

export default SignUpAdmin;
