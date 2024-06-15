import { FormEvent, useState } from "react";
import { FaAngleLeft, FaKey, FaSignInAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HeaderLogo } from "../../layout/Header";
import { Link, LinkButton } from "../../components/Link";
import { Label, LabelInput } from "../../components/Label";
import Input from "../../components/Input";
import Footer from "../../layout/Footer";
import { ButtonAction } from "../../components/Button";

interface SignInForm {
  username_email: string;
  password: string;
}

const SignInAdmin = () => {
  const [formData, setFormData] = useState({
    username_email: "",
    password: "",
  });

  const [message, setMessage] = useState<any>({});
  const [err, setErr] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (inputType: keyof SignInForm, newValue: string) => {
    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/signin", {
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
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className="flex flex-col justify-center items-center my-4">
        <LinkButton url="/" icon={<FaAngleLeft className="button-link" />} />
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
            type="Password"
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="Enter Password"
            icon={<FaKey />}
          />
          <ButtonAction
            text="Sign In"
            icon={<FaSignInAlt className="bg-transparent" />}
          />
        </form>
        {err ? <span className="text-danger">{message}</span> : ""}
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

export default SignInAdmin;
