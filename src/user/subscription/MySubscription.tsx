import React, { useEffect, useState, useCallback, useMemo } from "react";
import AppLayout from "../../layout/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "../../api/axios";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../../components/Loading";

const MySubscription: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const token = user?.api_token;
  const [loading, setLoading] = useState<boolean>(false);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [errorUserSubscription, setErrorUserSubscription] = useState<any>("");

  const fetchUserSubscription = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/user_subscriptions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (!data.success) {
        setErrorUserSubscription(data.message);
      } else {
        setUserSubscription(data.data);
      }
    } catch (error) {
      setErrorUserSubscription(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserSubscription();
  }, [fetchUserSubscription]);

  const targetDate = useMemo(() => {
    return userSubscription
      ? new Date(userSubscription.subscription_end_date)
      : new Date();
  }, [userSubscription]);

  const calculateTimeLeft = useCallback(() => {
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <AppLayout>
      <a href="/profile" className="absolute left-10">
        <FaArrowLeft />
      </a>
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl text-center w-full text-aprimary font-bold mb-16">
          My Subscription Plans Time!
        </p>
        {loading ? (
          <Loading value="Loading..." loading={true} />
        ) : (
          userSubscription && (
            <>
              <span>
                Hello,{" "}
                <span className="text-aprimary text-xl font-bold">
                  {user.username}
                </span>{" "}
                you are currently subscribed to the{" "}
                <span className="text-aprimary text-xl font-bold ">
                  {userSubscription.subscription_plan_name}
                </span>{" "}
                plan!
              </span>
              <div className="space-x-4 text-5xl h-60 flex items-center">
                <span className="border border-aprimary p-8">
                  {timeLeft.days}d
                </span>
                <span className="border border-aprimary p-8">
                  {timeLeft.hours}h
                </span>
                <span className="border border-aprimary p-8">
                  {timeLeft.minutes}m
                </span>
                <span className="border border-aprimary p-8">
                  {timeLeft.seconds}s
                </span>
              </div>
            </>
          )
        )}
      </div>
    </AppLayout>
  );
};

export default MySubscription;
