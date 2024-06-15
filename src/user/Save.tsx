import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import ListMovies from "../components/List";
import axios from "../api/axios";
import AppLayout from "../layout/AppLayout";
import { Label, LabelCategory } from "../components/Label";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../components/Loading";

const Save: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [savedMovies, setSavedMovies] = useState<any>([]);
  const [errorSavedMovies, setErrorSavedMovies] = useState<any>([]);
  const token = user?.api_token;
  const fetchSavedMovies = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/saved_movies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorSavedMovies(data.message);
        return;
      }
      setLoading(false);
      setSavedMovies(data.data);
    } catch (error) {
      setLoading(false);
      setErrorSavedMovies(error);
    }
  };
  useEffect(() => {
    fetchSavedMovies();
  }, []);
  return (
    <AppLayout>
      <span className="flex items-center w-full justify-center">
        <a href="/profile" className="absolute left-10">
          <FaArrowLeft />
        </a>
        <Label textLabel="My Save Movie" />
      </span>
      {loading ? (
        <Loading value="Loading..." loading={true} />
      ) : (
        <div className="px-3">
          {savedMovies.length > 0 ? (
            <ListMovies items={savedMovies} />
          ) : (
            <Loading value={errorSavedMovies} loading={false} />
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default Save;
