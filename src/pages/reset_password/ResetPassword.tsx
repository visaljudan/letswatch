import { FaAngleLeft, FaCheck, FaEnvelope } from "react-icons/fa";
import { ButtonAction } from "../../components/Button";
import { Label, LabelInput } from "../../components/Label";
import Input from "../../components/Input";
import Footer from "../../layout/Footer";
import { HeaderLogo } from "../../layout/Header";
import { FormEvent, useState } from "react";
import { LinkButton } from "../../components/Link";
import { useNavigate } from "react-router-dom";

interface VerifyAccountForm {
  username_email: string;
}

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username_email: "",
  });

  const [message, setMessage] = useState<any>({});
  const [err, setErr] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    inputType: keyof VerifyAccountForm,
    newValue: string
  ) => {
    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/verify-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        setErr(true);
        setMessage(data.message);
        return;
      }

      setErr(false);
      // navigate("new-password");
    } catch (error) {
      setErr(true);
      setMessage("An error occurred. Please try again."); // Handle error
    }
  };

  return (
    <>
      <HeaderLogo />
      <div className="flex flex-col justify-center items-center my-4">
        <LinkButton
          url="/signin"
          icon={<FaAngleLeft className="button-link" />}
        />
        <Label htmlFor="" textLabel="Reset Password" />
        <p className="text-warning my-4 text-sm">
          We will send link to your email for create new password! please goging
          to check your email.
        </p>
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <LabelInput htmlFor="username_email" textLabel="Username or Email" />
          <Input
            type="text"
            value={formData.username_email}
            onChange={(value) => handleChange("username_email", value)}
            placeholder="Enter Username or Email"
            icon={<FaEnvelope />}
          />
          <ButtonAction
            text="Comfirm"
            icon={<FaCheck className="bg-transparent" />}
          />
        </form>
        {err ? <span className="text-danger">{message}</span> : ""}
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
