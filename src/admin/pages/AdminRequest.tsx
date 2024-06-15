import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";
import { Label } from "../../components/Label";
import AdminLayout from "../layout/AdminLayout";
import { ButtonAction } from "../../components/Button";

interface User {
  username: string;
  email: string;
  user_id: number;
  role_id: number;
  confirmation_count: number;
  is_confirmed: boolean;
}

const AdminRequest: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [totalAdmins, setTotalAdmins] = useState<number>(0);

  const handleAccept = async (userId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admins/${userId}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred while accepting admin:", error);
    }
  };

  const fetchRequestAdmin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success === false) {
        setErr(true);
        setMessage(data.message);
        return;
      }
      setTotalAdmins(Math.ceil(data.total_admins / 2));
      setUsers(data.admins); // Update state with fetched admin data
      setErr(false);
    } catch (error) {
      setErr(true);
      setMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchRequestAdmin();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col px-3 w-full">
        <Label htmlFor="request-admin" textLabel="Request to Admin" />
        {users &&
          users.map((user, index) => (
            <div
              key={index}
              className="w-full h-16 text-xl border border-aprimary rounded flex justify-between items-center px-2 my-2"
            >
              <span className="text-aprimary font-bold flex items-center">
                <FaUser className="mr-2 fill-aprimary" />
                {user.username}
              </span>
              <span>{user.email}</span>

              <div className="flex items-center">
                <span className="mr-2 text-success">
                  Need {totalAdmins - user.confirmation_count} accpet
                </span>
                <ButtonAction
                  icon={<FaTimes className="bg-transparent" />}
                  text="Cancel"
                />
                <span className="mx-2"></span>
                <ButtonAction
                  icon={<FaCheck className="bg-transparent" />}
                  text="Accept"
                  onClick={() => handleAccept(user.user_id)}
                />
              </div>
            </div>
          ))}
        {/* <p className="text-aprimary">{message}</p> */}
      </div>
    </AdminLayout>
  );
};

export default AdminRequest;
