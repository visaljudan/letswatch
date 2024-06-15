import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaArrowRight, FaStar } from "react-icons/fa";

interface Movie {
  id: number;
  tv_show_id: number | null;
  title: string;
  overview: string;
  run_time: number;
  release_date: string;
  poster_image: string;
  cover_image: string;
  total_raters: number;
  total_ratings: number;
  average_rating: string;
  popularity: number;
  terms_status: string;
  upload_status: string;
  last_upload_date: string;
}

interface ListItem {
  id: number;
  movie?: Movie;
}

interface ListMoviesProps {
  items: ListItem[];
}

const ListMovies: React.FC<ListMoviesProps> = ({ items }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movieGenres, setMovieGenres] = useState<any>([]);
  const [errorGenres, setErrorGenres] = useState<any>([]);
  //Fetch movie genres
  const fetchMovieGenres = async (movieId: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`movie_genres/${movieId}/genres`);
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorGenres(data.message);
        return;
      }
      setLoading(false);
      setMovieGenres(data.data);
    } catch (error) {
      setLoading(false);
      setErrorGenres(error);
    }
  };
  useEffect(() => {
    if (items) {
      items.forEach((item) => {
        if (item.movie?.id) {
          fetchMovieGenres(item.movie?.id);
        }
      });
    }
  }, [items]);

  return (
    <>
      {items
        ?.slice()
        .reverse()
        .map((item) => (
          <a
            key={item.id}
            href={`/movies/${item.id}/detail`}
            className="y-2 px-3"
          >
            <div className="w-full flex space-x-4 border border-aprimary p-2 items-center relative">
              <img
                src={item.movie?.poster_image}
                alt=""
                className="w-24 h-32 object-cover"
              />
              <div>
                <p className="text-2xl text-aprimary font-bold">
                  {item.movie?.title}
                </p>
                <p className="text-md text-text ">{item.movie?.run_time}min</p>
                <span className="text-md text-text flex items-center space-x-1">
                  <p> {item.movie?.average_rating}</p>
                  <FaStar fill="yellow" />
                </span>
                <div className="flex space-x-2 my-2">
                  {loading && <p>Loading genres...</p>}
                  <>
                    {movieGenres?.map((movieGenre: any, index: number) => (
                      <p
                        key={movieGenre.id || index}
                        className="bg-aprimary px-2 rounded text-md"
                      >
                        {movieGenre.genre_name}
                      </p>
                    ))}
                  </>
                </div>
              </div>
              <div className="absolute right-10 text-2xl">
                <FaArrowRight />
              </div>
            </div>
          </a>
        ))}
    </>
  );
};

export default ListMovies;
