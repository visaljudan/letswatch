import { FormEvent, useEffect, useState } from "react";
import { HeaderLogo } from "../layout/Header";
import { Label, LabelInput } from "../components/Label";
import { ButtonAction } from "../components/Button";
import { Link } from "../components/Link";
import Footer from "../layout/Footer";
import Input from "../components/Input";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../app/user/userSlice";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import OAuth from "../components/OAuth";
interface SignInForm {
  username_email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const [formData, setFormData] = useState({
    username_email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (inputType: keyof SignInForm, newValue: string) => {
    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("http://127.0.0.1:8000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);
      if (data.success !== true) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  return (
    <>
      <HeaderLogo />
      <div className="flex flex-col justify-center items-center my-4">
        <a href="/" className="absolute top-28 left-10">
          <FaArrowLeft />
        </a>
        <Label htmlFor="" textLabel="Sign In" />
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <LabelInput htmlFor="username_email" textLabel="Username or Email" />
          <Input
            type="text"
            value={formData.username_email}
            onChange={(value) => handleChange("username_email", value)}
            placeholder="Enter Username or Email"
            icon={<FaUser />}
          />
          <LabelInput htmlFor="password" textLabel="Password" />
          <Input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="Enter Password"
            icon={<FaKey />}
            secound_icon={
              showPassword ? (
                <FaEyeSlash onClick={toggleShowPassword} />
              ) : (
                <FaEye onClick={toggleShowPassword} />
              )
            }
          />
          {errorMessage ? (
            <span className="text-danger">{errorMessage}</span>
          ) : null}
          <ButtonAction
            disabled={loading}
            text={loading ? "Loading..." : "Sign In"}
            icon={<FaSignInAlt className="bg-transparent" />}
          />
        </form>
        <OAuth />
        <span className="w-96">
          <span className="flex items-center">
            <p className="my-2"> Don't have account? </p>
            <Link url="signup" title="Sign Up" />
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

export default SignIn;
