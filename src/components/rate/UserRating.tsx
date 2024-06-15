import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { ButtonAction } from "../Button";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../api/axios";

interface UserRatingProps {
  movieId: any;
  title?: string;
}

const UserRating: React.FC<UserRatingProps> = ({ movieId, title }) => {
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);

  const user = useSelector((state: RootState) => state.user.currentUser?.data);
  const token = user?.api_token;

  useEffect(() => {
    if (movieId) {
      fetchRatedMovie(movieId);
    }
  }, [movieId]);

  const fetchRatedMovie = async (movieId: any) => {
    try {
      const response = await axios.get(`/rated_movies/${movieId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      if (!data.success) {
        setRating(0);
        return;
      }
      setRating(data.data.rated_value / 2);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleRate = (newRating: number) => {
    setRating(newRating);
  };

  const handleRateSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/rated_movies",
        {
          movie_id: movieId,
          rated_value: rating * 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response?.data;
      if (!data.success) {
        setLoading(false);
        setErrorMessage(data.message);
        return;
      }
      setLoading(false);
      toast.success(
        `You have successfully rated this ${title} with ${rating}!`,
        {
          position: "bottom-right",
          className: "bg-transparent",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  return (
    <div className="bg-transparent">
      <div className="flex bg-transparent">
        <StarRating totalStars={5} selectedStars={rating} onRate={handleRate} />
      </div>
      <p className="bg-transparent">
        You rated this movie {rating} out of 5 stars.
      </p>
      <ButtonAction
        text="Rate"
        onClick={handleRateSubmit}
        icon={<FaStar className="bg-transparent" />}
        disabled={loading}
      />
      {errorMessage && <p className="bg-transparent">{errorMessage}</p>}
      <ToastContainer />
    </div>
  );
};

export default UserRating;
