import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInSuccess } from "../app/user/userSlice";
import { FaGoogle } from "react-icons/fa";
import { ButtonAction } from "./Button";

const OAuth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const username = user.displayName;
      const email = user.email;
      const profile = user.photoURL;

      const response = await fetch("http://localhost:8000/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          profile: profile,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with backend");
      }

      console.log(response);
      const data = await response.json();

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Could not sign in with Google", error);
      // Optional: Set error state or show a user-friendly error message
    }
  };

  return (
    <ButtonAction
      icon={<FaGoogle className="bg-transparent" />}
      text=" Continue with Google account"
      onClick={handleGoogleClick}
    />
  );
};

export default OAuth;
