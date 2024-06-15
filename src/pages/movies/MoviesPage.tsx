import { useParams } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import { LabelCategory } from "../../components/Label";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Poster from "../../components/Poster";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";

const MoviesPage = () => {
  const params = useParams<{ page: string }>();
  const { page } = params;
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any>([]);
  const [errorMovies, setErrorMovies] = useState<any>([]);
  const [countryMovies, setCountryMovies] = useState<any>([]);
  const [errorCountry, setErrorCountry] = useState<any>([]);
  const [moviesLatest, setMoviesLatest] = useState<any>([]);
  const [errorMoviesLatest, setErrorMoviesLatest] = useState<any>([]);
  const [moviesPopluar, setMoviesPopluar] = useState<any>([]);
  const [errorMoviesPopluar, setErrorMoviesPopluar] = useState<any>([]);
  const [moviesTopRated, setMoviesTopRated] = useState<any>([]);
  const [errorMoviesTopRated, setErrorMoviesTopRated] = useState<any>([]);

  const fetchMovies = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/movies");
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMovies(data.message);
        return;
      }
      setLoading(false);
      setMovies(data.data);
    } catch (error) {
      setErrorMovies(error);
    }
  };

  const fetchMovieCountry = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie_countries`);
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorCountry(data.message);
        return;
      }
      setLoading(false);
      setCountryMovies(data.data);
    } catch (error) {
      setLoading(false);
      setErrorCountry(error);
    }
  };

  //Fetch movie latest
  const fetchLatest = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/latest");
      const data = response.data;

      if (!data.success) {
        setLoading(false);
        setErrorMoviesLatest(data.message);
        return;
      }

      setLoading(false);
      setMoviesLatest(data.data);
    } catch (error) {
      setErrorMoviesLatest(error);
    }
  };

  // Fetch movie popluar
  const fetchPopular = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/popular");
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMoviesPopluar(data.message);
        return;
      }
      setLoading(false);
      setMoviesPopluar(data.data);
    } catch (error) {
      setErrorMoviesPopluar(error);
    }
  };

  // Fetch movie top rate
  const fetchTopRated = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/top_rated");
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMoviesTopRated(data.message);
        return;
      }
      setLoading(false);
      setMoviesTopRated(data.data);
    } catch (error) {
      setLoading(false);
      setErrorMoviesTopRated(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchMovieCountry();
    fetchPopular();
    fetchTopRated();
    fetchLatest();
  }, []);
  return (
    <>
      <AppLayout page={page}>
        {page === "movies" ? (
          <>
            <LabelCategory textLabel="Movies" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : movies?.length > 0 ? (
              <div className="flex m-4">
                {movies?.map((movie: any, index: number) => (
                  <div key={movie.id || index} className="m-2">
                    <Poster
                      id={movie.id}
                      movieName={movie.title}
                      imageUrl={movie.poster_image}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>{errorMovies}</p>
            )}
          </>
        ) : page === "tv-shows" ? (
          <>
            <LabelCategory textLabel="TV-Shows" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : movies?.length > 0 ? (
              <div className="flex m-4">
                {movies
                  ?.filter((movie: any) => movie.tv_show_id !== null)
                  .map((movie: any, index: number) => (
                    <div key={movie.id || index} className="m-2">
                      <Poster
                        id={movie.id}
                        movieName={movie.title}
                        imageUrl={movie.poster_image}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <p>{errorMovies}</p>
            )}
          </>
        ) : page === "years" ? (
          <>
            <LabelCategory textLabel="Years" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : movies?.length > 0 ? (
              <div className="flex m-4">
                {movies
                  ?.sort(
                    (a: any, b: any) =>
                      new Date(b.release_date).getTime() -
                      new Date(a.release_date).getTime()
                  )
                  .map((movie: any, index: number) => (
                    <div key={movie.id || index} className="m-2">
                      <Poster
                        id={movie.id}
                        movieName={movie.title}
                        imageUrl={movie.poster_image}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <p>{errorMovies}</p>
            )}
          </>
        ) : page === "countries" ? (
          <>
            <LabelCategory textLabel="Countries" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : countryMovies?.length > 0 ? (
              <div className="flex m-4">
                {countryMovies
                  ?.filter((movie: any) => movie.country_code) // Filter out movies with undefined country_code
                  .slice()
                  .sort((a: any, b: any) => {
                    return a.country_code
                      .toLowerCase()
                      .localeCompare(b.country_code.toLowerCase());
                  })
                  .map((movie: any, index: number) => (
                    <div key={movie.id || index} className="m-2">
                      <Poster
                        id={movie.id}
                        movieName={movie.title}
                        imageUrl={movie.poster_image}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <p>{errorCountry}</p>
            )}
          </>
        ) : page === "popular" ? (
          <>
            <LabelCategory textLabel="Popular" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : moviesPopluar?.length > 0 ? (
              <div className="flex m-4">
                {moviesPopluar?.map((movie: any, index: number) => (
                  <div key={movie.id || index} className="m-2">
                    <Poster
                      id={movie.id}
                      movieName={movie.title}
                      imageUrl={movie.poster_image}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>{errorMoviesPopluar}</p>
            )}
          </>
        ) : page === "top-rated" ? (
          <>
            <LabelCategory textLabel="Top Rated" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : moviesTopRated?.length > 0 ? (
              <div className="flex m-4">
                {moviesTopRated?.map((movie: any, index: number) => (
                  <div key={movie.id || index} className="m-2">
                    <Poster
                      id={movie.id}
                      movieName={movie.title}
                      imageUrl={movie.poster_image}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>{errorMoviesTopRated}</p>
            )}
          </>
        ) : page === "latest-movies" ? (
          <>
            <LabelCategory textLabel="Latest Movies" />
            {loading ? (
              <Loading value="loading..." loading={true} />
            ) : moviesLatest?.length > 0 ? (
              <div className="flex m-4">
                {moviesLatest?.map((movie: any, index: number) => (
                  <div key={movie.id || index} className="m-2">
                    <Poster
                      id={movie.id}
                      movieName={movie.title}
                      imageUrl={movie.poster_image}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>{errorMoviesLatest}</p>
            )}
          </>
        ) : (
          <NotFound />
        )}
      </AppLayout>
    </>
  );
};

export default MoviesPage;
