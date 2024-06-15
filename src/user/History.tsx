import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import ListMovies from "../components/List";
import axios from "../api/axios";
import AppLayout from "../layout/AppLayout";
import { Label, LabelCategory } from "../components/Label";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../components/Loading";

const History: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [historyMovies, setHistoryMovies] = useState<any>([]);
  const [errorhistoryMovies, setErrorHistoryMovies] = useState<any>([]);
  const token = user?.api_token;
  const fetchHistoryMovies = async (): Promise<void> => {
    try {
      setLoading(true); // Set loading state to true

      // Make GET request using Axios
      const response = await axios.get("/historied_movies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Extract data from response
      const data = response.data;

      // Handle response data
      if (!data.success) {
        // If request was not successful
        setLoading(false); // Set loading state to false
        setErrorHistoryMovies(data.message);
        return;
      }

      // If request was successful
      setLoading(false); // Set loading state to false
      setHistoryMovies(data.data); // Update state with fetched data
    } catch (error) {
      // Handle network or other errors
      setLoading(false); // Set loading state to false
      setErrorHistoryMovies(error); // Set error state
    }
  };
  useEffect(() => {
    fetchHistoryMovies();
  }, []);

  return (
    <AppLayout>
      <span className="flex items-center w-full justify-center">
        <a href="/profile" className="absolute left-10">
          <FaArrowLeft />
        </a>
        <Label textLabel="My History" />
      </span>
      {loading ? (
        <Loading value="Loading..." loading={true} />
      ) : (
        <div className="px-3">
          {historyMovies.length > 0 ? (
            <ListMovies items={historyMovies} />
          ) : (
            <Loading value={errorhistoryMovies} loading={false} />
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default History;
