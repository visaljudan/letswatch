import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LabelCategory } from "../../components/Label";
import AppLayout from "../../layout/AppLayout";
import axios from "../../api/axios";
import Poster from "../../components/Poster";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";

const MoviesGenrePage = () => {
  const { id, page } = useParams<{ page: string; id: string }>();
  const [labelTitle, setLabelTitle] = useState<any>("");
  const [genreMovies, setGenreMovies] = useState<any>([]);
  const [errorGenre, setErrorGenre] = useState<any>([]);
  const [tvShowMovies, setTvShowMovies] = useState<any>([]);
  const [errorTvShow, setErrorTvShow] = useState<any>([]);
  const [countryMovies, setCountryMovies] = useState<any>([]);
  const [errorCountry, setErrorCountry] = useState<any>([]);
  const [yearMovies, setYearMovies] = useState<any>([]);
  const [errorYear, setErrorYear] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovieByGenre = async (genreId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie_genres/${genreId}/movies`);
      const data = response.data;
      if (!data.success === true) {
        setLoading(false);
        setErrorGenre(data.message);
        return;
      }
      setLoading(false);
      setGenreMovies(data.data);
    } catch (error) {
      setLoading(false);
      setErrorGenre(error);
    }
  };

  const fetchGenreById = async (genreId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/genres/${genreId}`);
      const data = response.data;
      if (!data.success === true) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setLabelTitle(data.data.genre_name);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMovieByTvShow = async (tvShowId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movies/tv_shows/${tvShowId}`);
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorTvShow(data.message);
        return;
      }
      setLoading(false);
      setTvShowMovies(data.data);
      console.log(data.data);
    } catch (error) {
      setLoading(false);
      setErrorTvShow(error);
    }
  };

  const fetchTvShowById = async (tvShowId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/tv_shows/${tvShowId}`);
      const data = response.data;
      if (!data.success === true) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setLabelTitle(data.data.tv_show_name);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMovieByCountry = async (countryCode: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/movie_countries/${countryCode}/movies`
      );
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

  const fetchCountryByCode = async (countryCode: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/countries/${countryCode}`);
      const data = response.data;
      if (!data.success === true) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setLabelTitle(data.data.country_name);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMovieByYear = async (year: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movies/years/${year}`);
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setErrorYear(data.message);
        return;
      }
      setLoading(false);
      setYearMovies(data.data);
    } catch (error) {
      setLoading(false);
      setErrorYear(error);
    }
  };

  useEffect(() => {
    if (id && page === "movies") {
      fetchGenreById(id);
      fetchMovieByGenre(id);
    } else if (id && page === "tv-shows") {
      fetchTvShowById(id);
      fetchMovieByTvShow(id);
    } else if (id && page === "countries") {
      fetchCountryByCode(id);
      fetchMovieByCountry(id);
    } else if (id && page === "years") {
      fetchMovieByYear(id);
      setLabelTitle(id);
    }
  }, [id]);

  return (
    <AppLayout>
      <LabelCategory textLabel={labelTitle} />
      {page === "movies" ? (
        <>
          {loading ? (
            <Loading value="loading..." loading={true} />
          ) : genreMovies?.length > 0 ? (
            <div className="flex m-4">
              {genreMovies?.map((movie: any, index: number) => (
                <div key={index} className="m-2">
                  <Poster
                    id={movie.id}
                    movieName={movie.title}
                    imageUrl={movie.poster_image}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Loading value={errorGenre} loading={false} />
          )}
        </>
      ) : page === "tv-shows" ? (
        <>
          {loading ? (
            <Loading value="loading..." loading={true} />
          ) : tvShowMovies?.length > 0 ? (
            <div className="flex m-4">
              {tvShowMovies?.map((movie: any, index: number) => (
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
            <Loading value={errorTvShow} loading={false} />
          )}
        </>
      ) : page === "years" ? (
        <>
          {loading ? (
            <Loading value="loading..." loading={true} />
          ) : yearMovies?.length > 0 ? (
            <div className="flex m-4">
              {yearMovies?.map((movie: any, index: number) => (
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
            <Loading value={errorYear} loading={false} />
          )}
        </>
      ) : page === "countries" ? (
        <>
          {loading ? (
            <Loading value="loading..." loading={true} />
          ) : countryMovies?.length > 0 ? (
            <div className="flex m-4">
              {countryMovies?.map((movie: any, index: number) => (
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
            <Loading value={errorCountry} loading={false} />
          )}
        </>
      ) : (
        <NotFound />
      )}
    </AppLayout>
  );
};

export default MoviesGenrePage;
