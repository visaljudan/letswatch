import {
  FaCheckCircle,
  FaClock,
  FaCog,
  FaExclamationCircle,
  FaMoneyBill,
  FaSave,
  FaSignOutAlt,
  FaSync,
} from "react-icons/fa";
import AppLayout from "../layout/AppLayout";
import { Label } from "../components/Label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ButtonAction } from "../components/Button";
import { useNavigate } from "react-router-dom";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../app/user/userSlice";
import axiosInstance from "../api/axios";

const Profile = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.api_token;

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    dispatch(signOutStart());
    try {
      const response = await axiosInstance.post(
        "/signout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      if (!data.success) {
        dispatch(signOutFailure(data.error));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error || "Sign out failed"));
    }
  };

  
  return (
    <AppLayout>
      <div className="flex flex-col items-center w-1/2 m-auto">
        <Label textLabel="Profile" />
        <div className="my-4">
          <img
            className={`w-32 h-32 rounded-full border ${
              user.role === "User Subscription"
                ? "border-aprimary border-2"
                : ""
            } `}
            src={user?.profile}
            alt="Profile"
          />

          <span className="flex items-center space-x-4 text-center text-xl font-bold my-2">
            <p>{user?.username}</p>
            {user.role === "User Subscription" && <FaCheckCircle fill="red" />}
          </span>
        </div>
        <div className="grid">
          <a
            href="/profile/setting"
            className="flex items-center justify-start space-x-4 border-b pr-40 py-4"
          >
            <FaCog />
            <p>Setting</p>
          </a>
          {user.role === "User Subscription" ? (
            <>
              <a
                href="/my-subscription"
                className="flex items-center justify-between border-b py-4"
              >
                <span className="flex items-center space-x-4">
                  <FaMoneyBill />
                  <p>Subscription</p>
                </span>
                <span>
                  <FaCheckCircle fill="green" />
                </span>
              </a>
              <a
                href="/history-movies"
                className="flex items-center justify-start space-x-4 border-b py-4"
              >
                <FaClock />
                <p>History</p>
              </a>
              <a
                href="/save-movies"
                className="flex items-center justify-start space-x-4 border-b py-4"
              >
                <FaSave />
                <p>Save</p>
              </a>
              <a
                href="#"
                className="flex items-center justify-start space-x-4 border-b py-4"
              >
                <FaSync />
                <p>Request Movie</p>
              </a>
            </>
          ) : (
            <>
              <a
                href="/subscription"
                className="flex items-center justify-between border-b py-4"
              >
                <span className="flex items-center space-x-4">
                  <FaMoneyBill />
                  <p>Subscription</p>
                </span>
                <span>
                  <FaExclamationCircle fill="red" />
                </span>
              </a>
              <a
                href="/history-movies"
                className="flex items-center justify-start space-x-4 border-b py-4"
              >
                <FaClock />
                <p>History</p>
              </a>
            </>
          )}

          <form onSubmit={handleSubmit}>
            <ButtonAction
              text={"Sign Out"}
              icon={<FaSignOutAlt className="bg-transparent" />}
            />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
