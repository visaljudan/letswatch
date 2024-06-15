import { FaCheck, FaFilm, FaSave, FaTimes, FaTv } from "react-icons/fa";
import AppLayout from "../../layout/AppLayout";
import Logo from "../../assets/logo.png";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Subscription = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any>([]);
  const [errorSubscriptionPlans, setErrorSubscriptionPlans] = useState<any>([]);

  const token = user?.api_token;
  const fetchSubscriptionPlan = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/subscription_plans", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorSubscriptionPlans(data.message);
        return;
      }
      setLoading(false);
      setSubscriptionPlans(data.data);
    } catch (error) {
      setErrorSubscriptionPlans(error);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlan();
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col w-5/6 m-auto">
        <p className="text-2xl text-start font-bold">
          Choose the plan that's right for you{" "}
        </p>
        <span className="flex items-center space-x-4 mt-2">
          <FaCheck fill="red" />
          <p>More useful than an average user.</p>
        </span>
        <span className="flex items-center space-x-4">
          <FaCheck fill="red" />
          <p>You can cancel your plan anytime.</p>
        </span>
        <div className="my-4">
          <table className="w-full table-auto border-collapse">
            <thead className="">
              <tr>
                <th className="border-b p-0 w-6/12">
                  <img className="h-20" src={Logo} alt="" />
                </th>
                {subscriptionPlans?.map(
                  (subscriptionPlan: any, index: number) => (
                    <th
                      key={subscriptionPlan.id || index}
                      className="border-b p-4 w-2/12"
                    >
                      <p className="text-sm text-secondary">
                        {subscriptionPlan.subscription_plan_name}
                      </p>
                      <p className="text-3xl text-aprimary">
                        {subscriptionPlan.subscription_plan_price}$
                      </p>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="group">
                <th className="p-4  group-hover:scale-105 bg-transparent group-hover:pl-8">
                  <span className="flex items-center justify-start space-x-4">
                    <FaTv fill="red" />
                    <p>1080 Resolotion</p>
                  </span>
                </th>
                <th className="px-20 group-hover:scale-105 bg-transparent  w-2/12">
                  <FaCheck fill="red" />
                </th>
                <th className="px-20 group-hover:scale-105 bg-transparent  w-2/12">
                  <FaCheck fill="red" />
                </th>
                <th className="px-20 group-hover:scale-105 bg-transparent  w-2/12">
                  <FaCheck fill="red" />
                </th>
              </tr>
              <tr className="group">
                <th className="p-4 group-hover:scale-105 bg-transparent group-hover:pl-8">
                  <span className="flex items-center justify-start space-x-4">
                    <FaSave fill="red" />
                    <p>Limit of Save</p>
                  </span>
                </th>
                <th className=" w-2/12 group-hover:scale-105 bg-transparent ">
                  50
                </th>
                <th className=" w-2/12 group-hover:scale-105 bg-transparent ">
                  100
                </th>
                <th className=" w-2/12 group-hover:scale-105 bg-transparent ">
                  Unlimited
                </th>
              </tr>
              <tr className="group">
                <th className="p-4 group-hover:scale-105 bg-transparent group-hover:pl-8">
                  <span className="flex items-center justify-start space-x-4">
                    <FaFilm fill="red" />
                    <p>Request for New Movie</p>
                  </span>
                </th>
                <th className="px-20 w-2/12 group-hover:scale-105 bg-transparent">
                  <FaTimes fill="gray" />
                </th>
                <th className="px-20 w-2/12 group-hover:scale-105 bg-transparent">
                  <FaTimes fill="gray" />
                </th>
                <th className="px-20  w-2/12 group-hover:scale-105 bg-transparent">
                  <FaCheck fill="red" />
                </th>
              </tr>
              <tr className="group">
                <th className="p-4 group-hover:scale-105 bg-transparent group-hover:pl-8">
                  <span className="flex items-center justify-start space-x-4">
                    <FaFilm fill="red" />
                    <p>Unlimited of Movies and TV-Shows</p>
                  </span>
                </th>
                <th className="px-20 w-2/12 group-hover:scale-105 bg-transparent">
                  <FaCheck fill="red" />
                </th>
                <th className="px-20  w-2/12 group-hover:scale-105 bg-transparent">
                  <FaCheck fill="red" />
                </th>
                <th className="px-20  w-2/12 group-hover:scale-105 bg-transparent">
                  <FaCheck fill="red" />
                </th>
              </tr>
              <tr className="">
                <th className="p-4 group-hover:pl-8"></th>
                {subscriptionPlans?.map((subscriptionPlan: any) => (
                  <th className="w-2/12 group-hover:scale-105 bg-transparent ">
                    <a
                      href={`subscription/${subscriptionPlan.id}/payment`}
                      className="border border-aprimary px-2 p-1 rounded bg-aprimary hover:bg-primary"
                    >
                      Choose
                    </a>
                  </th>
                ))}

                {/* <th className="w-2/12 group-hover:scale-105 bg-transparent">
                  <a
                    href="subscription/Siliver/payment"
                    className="border border-aprimary px-2 p-1 rounded bg-aprimary hover:bg-primary"
                  >
                    Choose
                  </a>
                </th>
                <th className="w-2/12 group-hover:scale-105 bg-transparent">
                  <a
                    href="subscription/Gold/payment"
                    className="border border-aprimary px-2 p-1 rounded bg-aprimary hover:bg-primary"
                  >
                    Choose
                  </a>
                </th> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Subscription;
