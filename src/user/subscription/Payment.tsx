import React, { useEffect, useState } from "react";
import { LabelInput } from "../../components/Label";
import Input from "../../components/Input";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheck,
  FaCreditCard,
  FaEnvelope,
  FaLock,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import AppLayout from "../../layout/AppLayout";
import { ButtonAction } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "../../api/axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../app/user/userSlice";

interface PaymentForm {
  card_number: string;
  expiry: string;
  cvv: string;
  name: string;
}

const PaymentForm: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const token = user?.api_token;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>([]);
  const [errorSubscriptionPlan, setErrorSubscriptionPlan] = useState<any>([]);
  const [errorPayment, setErrorPayment] = useState<any>([]);
  const [formData, setFormData] = useState({
    card_number: "",
    expiry: "",
    cvv: "",
    name: "",
    subscription_plan_id: id,
    user_id: user?.id,
    amount: 0,
    description: "Pay for subscription plan!",
  });

  const handleChange = (inputType: keyof PaymentForm, newValue: string) => {
    let value = newValue;

    if (inputType === "expiry") {
      value = formatExpiry(value);
    }

    if (inputType === "cvv") {
      value = formatCvv(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputType]: value,
    }));
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setFormData((prevFormData) => ({
      ...prevFormData,
      stripeToken: image,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      console.log(formData);
      setLoading(true);
      const response = await axios.post("/payments", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (!data.success) {
        setLoading(false);
        dispatch(signInFailure(data.message));
        setErrorPayment(data.message);
        console.log(data);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/profile");
      setLoading(false);
    } catch (error) {
      dispatch(signInFailure(error));
      setErrorPayment(error);
    }
  };

  const fetchSubscriptionPlanById = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/subscription_plans/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      setSubscriptionPlan(data.data);
      setAmount(data.data.subscription_plan_price);
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: data.data.subscription_plan_price,
      }));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorSubscriptionPlan(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubscriptionPlanById(id);
    }
  }, [id]);

  const formatExpiry = (value: string) => {
    // Allow only digits and slashes
    value = value.replace(/[^0-9\/]/g, "");
  
    // Automatically insert a slash after two digits
    if (value.length >= 2 && !value.includes("/")) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
  
    // Limit the length to 5 characters (MM/YY)
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
  
    // Ensure MM part allows only 1 to 12
    const month = parseInt(value.slice(0, 2), 10);
    if (month < 1 || month > 12) {
      value = "";
    }
  
    return value;
  };
  

  const formatCvv = (value: string) => {
    // Allow only digits and limit to 3 characters
    return value.replace(/[^0-9]/g, "").slice(0, 3);
  };

  return (
    <AppLayout>
      <div className="flex flex-col w-2/6 m-auto">
        <a href="/subscription" className="absolute left-10">
          <FaArrowLeft />
        </a>
        <span className="mb-2 flex items-center space-x-4 border px-2 border-aprimary bg-aprimary">
          <FaCheck className="bg-transparent" />
          <p className="bg-transparent">
            You have been selected with{" "}
            <span className="text-yellow-500 font-bold bg-transparent">
              {subscriptionPlan.subscription_plan_name}
            </span>{" "}
            plan.
          </p>
        </span>

        <span className="flex items-center justify-between pb-2 border-b  border-aprimary">
          <p className="font-bold text-2xl">Total</p>
          <p className="font-bold text-2xl">
            {subscriptionPlan.subscription_plan_price}$
            <span className="text-sm text-gray-500">/month</span>
          </p>
        </span>
        <div className="flex justify-between items-center">
          <span className="flex items-center space-x-2 my-2 ">
            <FaEnvelope fill="gray" />
            <p className="flex items-center text-gray-500">{user?.email}</p>
          </span>
          <span className="flex items-center space-x-2 my-2 ">
            <FaUser fill="gray" />
            <p className="flex items-center text-gray-500">{user?.username}</p>
          </span>
        </div>
        <div className="flex items-center space-x-4 my-2">
          <p>Select your payment method </p>
          <img
            className={`h-8 cursor-pointer ${
              selectedImage === "tok_visa"
                ? "border border-2 border-aprimary"
                : ""
            }`}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPkrXl2UNqKdOlijbtcwzD4LG5DgGiY25i6tqarWsbQ&s"
            alt="Visa"
            onClick={() => handleImageSelect("tok_visa")}
          />
          <img
            className={`h-8 cursor-pointer ${
              selectedImage === "tok_mastercard"
                ? "border border-2 border-aprimary"
                : ""
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
            alt="MasterCard"
            onClick={() => handleImageSelect("tok_mastercard")}
          />
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <LabelInput textLabel="Card Number" />
            <Input
              id="card_number"
              type="text"
              value={formData.card_number}
              onChange={(value) => handleChange("card_number", value)}
              placeholder="Enter Card Number"
              icon={<FaCreditCard />}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-1/3">
              <LabelInput textLabel="Expiry" />
              <Input
                id="expiry"
                type="text"
                value={formData.expiry}
                onChange={(value) => handleChange("expiry", value)}
                placeholder="MM/YY"
                icon={<FaCalendarAlt />}
              />
            </div>
            <div>
              <LabelInput textLabel="CVV" />
              <Input
                id="cvv"
                type="text"
                value={formData.cvv}
                onChange={(value) => handleChange("cvv", value)}
                placeholder="CVV"
                icon={<FaLock />}
              />
            </div>
          </div>
          <div className="mb-4">
            <LabelInput textLabel="Cardholder's Name" />
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Cardholder's Name"
              icon={<FaUser />}
            />
          </div>
          <ButtonAction
            text="Payment Confirm"
            icon={<FaWallet className="bg-transparent" />}
          />
        </form>
        {errorPayment && <p className="text-aprimary">{errorPayment}</p>}
      </div>
    </AppLayout>
  );
};

export default PaymentForm;
