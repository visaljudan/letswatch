import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Input from "../components/Input";
import { HeaderLogo } from "../layout/Header";
import { Label, LabelInput } from "../components/Label";
import { ButtonAction } from "../components/Button";
import { Link, LinkButton } from "../components/Link";
import Footer from "../layout/Footer";
import {
  FaAngleLeft,
  FaArrowLeft,
  FaCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpFailure,
  signUpSuccess,
} from "../app/user/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import OAuth from "../components/OAuth";
import axios from "../api/axios";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  cPassword: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const [messageLenght, setMessageLength] = useState<any>({});
  const [messageMatch, setMessageMatch] = useState<any>({});
  const [errLength, setErrLength] = useState<boolean>(false);
  const [errMatch, setErrMatch] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  useEffect(() => {
    dispatch(signUpFailure(null));
  }, []);

  //OnChange
  const handleChange = (inputType: keyof SignUpForm, newValue: string) => {
    if (inputType === "password") {
      if (newValue.length < 6 && newValue.length > 0) {
        setErrLength(true);
        setMessageLength("Password must be at least 6 characters long.");
      } else {
        setErrLength(false);
        setMessageLength("");
      }
    }

    if (inputType === "cPassword") {
      if (newValue !== formData.password) {
        setErrMatch(true);
        setMessageMatch("Passwords do not match.");
      } else {
        setErrMatch(false);
        setMessageMatch("");
      }
    }

    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };

  //OnSubmit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (formData.password !== formData.cPassword) {
      dispatch(signUpFailure("Passwords do not match."));
      return;
    }

    try {
      dispatch(signUpStart());
      const response = await fetch("http://127.0.0.1:8000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(signUpFailure(data.error));
        return;
      }
      dispatch(signUpSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
  return (
    <>
      <HeaderLogo />
      <div className="flex flex-col justify-center items-center my-4">
        <a href="/" className="absolute top-28 left-10">
          <FaArrowLeft />
        </a>
        <Label htmlFor="" textLabel="Sign Up" />
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <span className="flex items-center text-aprimary">
            <LabelInput htmlFor="username" textLabel="Username" />*
          </span>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(value) => handleChange("username", value)}
            placeholder="Enter username"
            icon={<FaUser />}
            pattern="[a-zA-Z0-9]*"
            required={true}
          />
          <span className="flex items-center text-aprimary">
            <LabelInput htmlFor="email" textLabel="Email" />*
          </span>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            placeholder="Enter email"
            icon={<FaEnvelope />}
            required={true}
          />
          <span className="flex items-center text-aprimary">
            <LabelInput htmlFor="password" textLabel="Password" />*
          </span>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="Enter Password"
            icon={<FaKey />}
            secound_icon={
              showPassword ? (
                <FaEye onClick={toggleShowPassword} />
              ) : (
                <FaEyeSlash onClick={toggleShowPassword} />
              )
            }
            required={true}
          />
          {errLength ? (
            <span className="text-danger">{messageLenght}</span>
          ) : (
            ""
          )}
          <span className="flex items-center text-aprimary">
            <LabelInput htmlFor="cPassword" textLabel="Confirm Password" />*
          </span>
          <Input
            id="cPassword"
            type={showCPassword ? "text" : "password"}
            value={formData.cPassword}
            onChange={(value) => handleChange("cPassword", value)}
            placeholder="Enter Confirm Password"
            icon={<FaCheck />}
            pattern="[^\s]*"
            required={true}
            secound_icon={
              showCPassword ? (
                <FaEye onClick={toggleShowCPassword} />
              ) : (
                <FaEyeSlash onClick={toggleShowCPassword} />
              )
            }
          />
          {errMatch ? <span className="text-danger">{messageMatch}</span> : ""}
          {errorMessage?.username && errorMessage?.email ? (
            <span className="text-danger ">
              The username and email have already been taken.
            </span>
          ) : errorMessage?.username ? (
            <span className="text-danger">{errorMessage.username}</span>
          ) : errorMessage?.email ? (
            <span className="text-danger">{errorMessage.email}</span>
          ) : errorMessage ? (
            <span className="text-danger">{errorMessage}</span>
          ) : null}
          <ButtonAction
            disabled={loading}
            text={loading ? "Loading..." : "Sign Up"}
            icon={<FaUser className="bg-transparent" />}
          />
        </form>

        <OAuth />

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

export default SignUp;
