import { FormEvent, useEffect, useState } from "react";
import { HeaderLogo } from "../../layout/Header";
import { Label, LabelInput } from "../../components/Label";
import Input from "../../components/Input";
import { FaAngleLeft, FaCheck, FaKey } from "react-icons/fa";
import { ButtonAction } from "../../components/Button";
import Footer from "../../layout/Footer";
import { useNavigate, useParams } from "react-router-dom";

interface NewPasswordForm {
  new_password: string;
  cNew_password: string;
}

const NewPassword = () => {
  const [formData, setFormData] = useState({
    new_password: "",
    cNew_password: "",
  });

  const [err, setErr] = useState<Boolean>(false);
  const [message, setMessage] = useState<any>("");
  const [id, setid] = useState<Number>();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const handleChange = (inputType: keyof NewPasswordForm, newValue: string) => {
    setFormData({
      ...formData,
      [inputType]: newValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${id}/new-password`,
        {
          method: "PUT",
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
        console.log(data.message);
        setMessage(data.message);
        return;
      }

      setErr(false);
      // navigate("new-password");
    } catch (error) {
      setErr(true);
      console.log(error);
      setMessage("An error occurred. Please try again."); // Handle error
    }
  };

  const verifyUser = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/verify-tokens/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success === false) {
        setErr(true);
        setMessage(data.message);
        navigate("notfound");
        return;
      }

      setid(data.user);
      setErr(false);
    } catch (error) {
      setErr(true);
      setMessage("An error occurred. Please try again."); // Handle error
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <>
      <HeaderLogo />
      <div className="flex flex-col justify-center items-center my-4">
        <Label htmlFor="" textLabel="New Password" />
        <form className="flex flex-col w-96 my-2" onSubmit={handleSubmit}>
          <LabelInput htmlFor="new_password" textLabel="New Password" />
          <Input
            type="password"
            value={formData.new_password}
            onChange={(value) => handleChange("new_password", value)}
            placeholder="Enter New Password"
            icon={<FaKey />}
          />
          <LabelInput
            htmlFor="cNew_password"
            textLabel="Confirm New Password"
          />
          <Input
            type="password"
            value={formData.cNew_password}
            onChange={(value) => handleChange("cNew_password", value)}
            placeholder="Enter Confirm New Password"
            icon={<FaCheck />}
          />

          <ButtonAction
            text="Comfirm"
            icon={<FaCheck className="bg-transparent" />}
          />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default NewPassword;
