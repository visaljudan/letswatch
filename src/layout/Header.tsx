import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import { Link, LinkDisabled } from "../components/Link";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  FaBell,
  FaCalendarAlt,
  FaCompass,
  FaFilm,
  FaGlobeAmericas,
  FaHome,
  FaSearch,
  FaStar,
  FaTv,
  FaUserAlt,
} from "react-icons/fa";
import Input from "../components/Input";
import axios from "../api/axios";
import Loading from "../components/Loading";

export const HeaderLogo = () => {
  return (
    <div className="w-full h-18 border-b-2 border-aprimary flex items-center justify-center ">
      <Logo />
    </div>
  );
};

export const Header = ({ page }: { page?: string }) => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<any>([]);
  const [errorGenres, setErrorGenres] = useState<any>([]);
  const [tvShows, setTvShows] = useState<any>([]);
  const [errorTvShows, setErrorTvShows] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [errorCountries, setErrorCountries] = useState<any>([]);
  const [years, setYears] = useState<any>([]);
  const [errorYears, setErrorYears] = useState<any>([]);

  const [formData, setFormData] = useState({
    search: "",
  });
  const [movies, setMovies] = useState<any[]>([]); // Change to array of any
  const [errorMovies, setErrorMovies] = useState<string | null>(null); // Change to string or null

  const handleChange = async (inputType: string, newValue: string) => {
    if (inputType === "search") {
      setFormData({
        ...formData,
        search: newValue,
      });
      try {
        const response = await axios.get<{ data: any[] }>(
          "movies/search/title",
          {
            params: { query: newValue },
          }
        );
        const data = response.data;
        setMovies(data.data);
        setErrorMovies(null);
      } catch (error) {
        setErrorMovies("No movies found matching the criteria");
        setMovies([]);
      }
    }
  };

  //Fetch Genres
  const fetchGenres = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/genres");
      const data = await response.data;
      if (!data.success === true) {
        setLoading(false);
        setErrorGenres(data.message);
        return;
      }
      setLoading(false);
      setGenres(data.data);
    } catch (error) {
      setLoading(false);
      setErrorGenres(error);
    }
  };

  //Fetch TV-Shows
  const fetchTvShows = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("tv_shows");
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorTvShows(data.message);
        return;
      }
      setLoading(false);
      setTvShows(data.data);
    } catch (error) {
      setLoading(false);
      setErrorTvShows(error);
    }
  };

  //Fetch Countries
  const fetchCountries = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("countries");
      const data = await response.data;

      if (!data.success) {
        setLoading(false);
        setErrorCountries(data.message);
        return;
      }

      setLoading(false);
      setCountries(data.data);
    } catch (error) {
      setLoading(false);
      setErrorCountries(error);
    }
  };

  //Fetch years
  const fetchYears = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("years");
      const data = await response.data;

      if (!data.success) {
        setLoading(false);
        setErrorYears(data.message);
        return;
      }

      setLoading(false);
      setYears(data.data);
    } catch (error) {
      setLoading(false);
      setErrorYears(error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchTvShows();
    fetchCountries();
    fetchYears();
  }, []);

  return (
    <div className="w-full h-20 border-b-2 border-aprimary flex items-center justify-between pr-3 mb-4 sticky top-0 z-50 ">
      <Logo />
      <div className="flex items-center justify-between ">
        <a
          href="/"
          className={`relative mx-2 ${
            page === "home" ? "pointer-events-none" : ""
          }`}
        >
          <span className="absolute inset-y-0 left-0 flex items-center bg-transparent sm:display-none">
            <FaHome fill={page === "home" ? "red" : "white"} />
          </span>
          <p
            className={` ml-6 ${
              page === "home" ? "text-aprimary font-bold" : "link"
            } display:block hidden xl:flex`}
          >
            Home
          </p>
        </a>
        <div className="group">
          <a
            href="/movies"
            className={`relative mx-2 ${
              page === "movies" ? "pointer-events-none" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center bg-transparent sm:display-none">
              <FaFilm fill={page === "movies" ? "red" : "white"} />
            </span>
            <p
              className={`ml-8 ${
                page === "movies" ? "text-aprimary font-bold" : "link"
              } display:block hidden xl:flex`}
            >
              Movies
            </p>
          </a>
          <div className="absolute top-13 p-2 bg-primary grid grid-cols-3 z-50 gap-7 hidden group-hover:grid">
            {loading ? (
              <Loading value="loading..." />
            ) : genres.length > 0 ? (
              genres.map((genre: any) => (
                <div key={genre.id}>
                  <a href={`/movies/${genre.id}`} className="link">
                    {genre.genre_name}
                  </a>
                </div>
              ))
            ) : (
              <p>{errorGenres}</p>
            )}
          </div>
        </div>
        <div className="group">
          <a
            href="/tv-shows"
            className={`relative mx-2 ${
              page === "tv-shows" ? "pointer-events-none" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center bg-transparent sm:display-none">
              <FaTv fill={page === "tv-shows" ? "red" : "white"} />
            </span>
            <p
              className={`ml-8 ${
                page === "tv-shows" ? "text-aprimary font-bold" : "link"
              } display:block hidden xl:flex`}
            >
              TV-Show
            </p>
          </a>
          <div className="absolute top-13 p-2 bg-primary grid grid-cols-3 z-50 gap-7 hidden group-hover:grid">
            {loading ? (
              <Loading value="loading..." />
            ) : tvShows.length > 0 ? (
              tvShows.map((tvShow: any) => (
                <div key={tvShow.id}>
                  <a href={`/tv-shows/${tvShow.id}`} className="link">
                    {tvShow.tv_show_name}
                  </a>
                </div>
              ))
            ) : (
              <p>{errorTvShows}</p>
            )}
          </div>
        </div>
        <div className="group">
          <a
            href="/countries"
            className={`relative mx-2 ${
              page === "countries" ? "pointer-events-none" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center bg-transparent sm:display-none">
              <FaGlobeAmericas fill={page === "countries" ? "red" : "white"} />
            </span>
            <p
              className={`ml-8 ${
                page === "countries" ? "text-aprimary font-bold" : "link"
              } display:block hidden xl:flex`}
            >
              Countries
            </p>
          </a>
          <div className="absolute top-13 p-2 bg-primary grid grid-cols-3 z-50 gap-7 hidden group-hover:grid">
            {loading ? (
              <Loading value="loading..." />
            ) : countries.length > 0 ? (
              countries.map((country: any) => (
                <div key={country.id}>
                  <a
                    href={`/countries/${country.country_code}`}
                    className="link"
                  >
                    {country.country_name}
                  </a>
                </div>
              ))
            ) : (
              <p>{errorCountries}</p>
            )}
          </div>
        </div>
        <div className="group">
          <a
            href="/years"
            className={`relative mx-2 ${
              page === "years" ? "pointer-events-none" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center bg-transparent sm:display-none">
              <FaCalendarAlt fill={page === "years" ? "red" : "white"} />
            </span>
            <p
              className={`ml-8 ${
                page === "years" ? "text-aprimary font-bold" : "link"
              } display:block hidden xl:flex`}
            >
              Years
            </p>
          </a>
          <div className="absolute top-13 p-2 bg-primary grid grid-cols-3 z-50 gap-7 hidden group-hover:grid">
            {loading ? (
              <Loading value="loading..." />
            ) : years.length > 0 ? (
              years.map((year: any) => (
                <div key={year.id}>
                  <a href={`/years/${year.year}`} className="link">
                    {year.year}
                  </a>
                </div>
              ))
            ) : (
              <p>{errorYears}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <form className="w-64 hover">
          <Input
            type="text"
            value={formData.search}
            onChange={(value) => handleChange("search", value)}
            placeholder="Search..."
            icon={<FaSearch />}
          />
          {formData?.search?.length !== 0 ? (
            <div className="absolute top-13 p-2 w-64 z-50 ">
              {loading ? (
                <Loading value="loading..." />
              ) : (
                movies?.map((movie: any) => (
                  <a
                    key={movie.id}
                    href={`/movies/${movie.id}/detail`}
                    className="w-full flex my-2"
                  >
                    <img
                      src={movie.poster_image}
                      alt="poster"
                      className="w-12 mr-2"
                    />
                    <div>
                      <span className="text-aprimary font-bold">
                        {movie.title}
                      </span>
                      <p className="text-xs">{movie.run_time}min</p>
                      <p className="text-xs flex items-center">
                        <FaStar fill="red" />
                        {movie.average_rating}
                      </p>
                    </div>
                  </a>
                ))
              )}
              {errorMovies && <p>{errorMovies}</p>}
            </div>
          ) : (
            ""
          )}
        </form>
        <div className="m-2 flex items-center space-x-2">
          {page === "explore" ? (
            <LinkDisabled
              title="Explore"
              icon={<FaCompass style={{ fill: "red" }} />}
            />
          ) : (
            <Link url="/explore" title="Explore" icon={<FaCompass />} />
          )}
          {user?.role === "User Subscription" ? <FaBell /> : ""}
        </div>
      </div>
      <div className="flex items-center">
        {user ? (
          <a href="/profile" className="flex items-center space-x-2">
            <p> {user.username}</p>
            <img
              src={user.profile}
              alt=""
              className="h-8 w-8 rounded rounded-full object-cover border border-aprimary"
            />
          </a>
        ) : (
          <Link url="/signup" title="Account" icon={<FaUserAlt />} />
        )}
      </div>
    </div>
  );
};
