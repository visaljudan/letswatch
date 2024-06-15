import AppLayout from "../../../layout/AppLayout";
import {
  FaBookmark,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaPlayCircle,
  FaRegBookmark,
  FaStar,
  FaThumbsUp,
  FaTiktok,
  FaTwitter,
  FaUserAlt,
} from "react-icons/fa";
import { LabelCategory } from "../../../components/Label";
import { useParams } from "react-router-dom";
import { ButtonAction } from "../../../components/Button";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ReactPlayer from "react-player";
import UserRating from "../../../components/rate/UserRating";
import CountryFlag from "react-country-flag";
import axios from "../../../api/axios";
import Loading from "../../../components/Loading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const MovieDetail = () => {
  const user = useSelector(
    (state: RootState) => state?.user?.currentUser?.data
  );
  const params = useParams<{ id: any }>();
  const { id } = params;
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<any>([]);
  const [errorMovie, setErrorMovie] = useState<any>([]);
  const [movieGenres, setMovieGenres] = useState<any>([]);
  const [errorGenres, setErrorGenres] = useState<any>([]);
  const [movieArtists, setMovieArtists] = useState<any>([]);
  const [errorMovieArtists, setErrorMovieArtists] = useState<any>([]);
  const [movieCountries, setMovieCountries] = useState<any>([]);
  const [errorMovieCountries, setErrorMovieCountries] = useState<any>([]);
  const [moviePhotos, setMoviePhotos] = useState<any>([]);
  const [errorMoviePhotos, setErrorMoviePhotos] = useState<any>([]);
  const [movieVideos, setmovieVideos] = useState<any>([]);
  const [errorMovieVideos, setErrorMovieVideos] = useState<any>([]);
  const [saved, setSaved] = useState<any>([]);
  const [errorSaved, setErrorSaved] = useState<any>([]);
  const token = user?.api_token;

  //Fetch movie by id
  const fetchMovieById = async (movieId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movies/${movieId}`);
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMovie(data.message);
        return;
      }
      setLoading(false);
      setMovie(data.data);
    } catch (error) {
      setErrorMovie(error);
    }
  };

  //Fetch movie genres
  const fetchMovieGenres = async (movieId: string): Promise<void> => {
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

  //Fetch movie artists
  const fetchMovieArtists = async (movieId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie_artists/${movieId}/movie`);
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMovieArtists(data.message);
        return;
      }
      setLoading(false);
      setMovieArtists(data.data);
    } catch (error) {
      setLoading(false);
      setErrorMovieArtists(error);
    }
  };

  //Fetch movie countries
  const fetchMovieCountries = async (movieId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie_countries/${movieId}/countries`);
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMovieCountries(data.message);
        return;
      }
      setLoading(false);
      setMovieCountries(data.data);
    } catch (error) {
      setLoading(false);
      setErrorMovieCountries(error);
    }
  };

  //Fetch movie photo
  const fetchMoviePhotos = async (movieId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie_photos/${movieId}/photos`);
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMoviePhotos(data.message);
        return;
      }
      setLoading(false);
      setMoviePhotos(data.data);
    } catch (error) {
      setLoading(false);
      setErrorMoviePhotos(error);
    }
  };

  const fetchMovieVideos = async (movieId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie_videos/${movieId}/trailer`);
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMovieVideos(data.message);
        return;
      }
      setLoading(false);
      setmovieVideos(data.data);
    } catch (error) {
      setLoading(false);
      setErrorMovieVideos(error);
    }
  };

  const pushHistoryMovie = async (
    userId: string,
    movieId: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/historied_movies`,
        {
          user_id: userId,
          movie_id: movieId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        setErrorMovieVideos(data.message);
        return;
      }
      setLoading(false);
      setmovieVideos(data.data);
    } catch (error) {
      setLoading(false);
      setErrorMovieVideos(error);
    }
  };

  const handleSaveMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/saved_movies",
        {
          movie_id: movie?.id,
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
        setErrorSaved(data.message);
        return;
      }

      setLoading(false);
      toast.success(`You have successfully saved this ${movie?.title} with}!`, {
        position: "bottom-right",
        className: "bg-transparent",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setSaved(true);
    } catch (error) {
      setLoading(false);
      setErrorSaved(error);
    }
  };

  const handleUnsaveMovie = async () => {
    setLoading(true);
    console.log(movie?.id);
    try {
      const response = await axios.delete(`/saved_movies/${movie?.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      if (!data.success) {
        setLoading(false);
        setErrorSaved(data.message);
        return;
      }

      setLoading(false);
      toast.success(
        `You have successfully unsaved this ${movie?.title} with}!`,
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
      // setSaved(false);
    } catch (error) {
      setLoading(false);
      setErrorSaved(error);
    }
  };

  const fetchSavedMovie = async (movieId: string) => {
    try {
      const response = await axios.get(`/saved_movies/${movieId}`);
      const data = await response.data;
      if (!data.success) {
        setErrorSaved(data.message);
        setSaved(false);
        return;
      }
      setSaved(true);
    } catch (error) {
      setErrorSaved(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchMovieById(id);
      fetchMovieGenres(id);
      fetchMovieArtists(id);
      fetchMovieCountries(id);
      fetchMoviePhotos(id);
      fetchMovieVideos(id);
      fetchSavedMovie(id);
    }
    const timer = setTimeout(() => {
      if (id) {
        pushHistoryMovie(user.id, id);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [id]);
  return (
    <AppLayout>
      <div className="my-2">
        {/* Navigate Links */}
        <div className="text-sm my-4">
          <a href="/" className="mr-2 hover:underline">
            Home
          </a>
          <span className="mr-2">&gt;</span>
          <a href="/movies" className="mr-2 hover:underline">
            Movies
          </a>
          <span className="mr-2">&gt;</span>
          <span className="underline text-aprimary">{movie.title ?? ""}</span>
        </div>
        {/* Movies */}
        {loading ? (
          <Loading value="Loading..." loading={true} />
        ) : (
          <div className="relative h-auto w-full flex items-center justify-center">
            <img
              className="w-full h-96 object-cover opacity-30"
              src={movie?.cover_image}
              alt=""
            />

            <div className="absolute flex top-8 left-8 right-8 h-80 bg-primary bg-opacity-30 items-center">
              <img
                src={movie?.poster_image}
                alt="Movie Poster"
                className="w-48 h-72 object-cover m-2"
              />
              <div className="w-3/4 h-full text-left px-4 bg-transparent">
                <p className="text-aprimary text-3xl my-2 font-bold bg-transparent">
                  {movie?.title}
                </p>
                <p className="text-base text-justify bg-transparent">
                  {movie?.overview}
                </p>
                <div className="bg-transparent mb-4 mt-8 font-bold flex space-x-4">
                  <span className="flex items-center bg-transparent">
                    <FaClock className="bg-transparent mr-2" fill="red" />
                    <span className="bg-transparent">{movie?.run_time}min</span>
                  </span>
                  <span className="flex items-center bg-transparent">
                    <FaUserAlt className="bg-transparent mr-2" fill="red" />
                    <span className="bg-transparent">
                      {movieArtists?.map((movieArtist: any) =>
                        movieArtist.role_name === "Director" ? (
                          <span className="bg-transparent" key={movieArtist.id}>
                            {movieArtist.artist_name}
                          </span>
                        ) : (
                          ""
                        )
                      )}
                    </span>
                  </span>
                  <span className="flex items-center bg-transparent">
                    {movieCountries?.map((movieCountry: any, index: number) => (
                      <span
                        key={movieCountry.id || index}
                        className="flex items-center bg-transparent"
                      >
                        <CountryFlag
                          countryCode={movieCountry.country_code}
                          svg
                          className="mr-2"
                        />
                        <a
                          href={`/countries/${movieCountry.country_code}`}
                          className="bg-transparent"
                        >
                          {movieCountry.country_name}
                        </a>
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center bg-transparent">
                    <FaStar className="bg-transparent mr-2" fill="red" />
                    <span className="bg-transparent">
                      {movie?.average_rating}
                    </span>
                  </span>
                </div>
                <div className="bg-transparent my-4">
                  <span className="flex items-center bg-transparent space-x-4">
                    {movieGenres?.map((movieGenre: any, index: number) => (
                      <a
                        key={movieGenre.id || index}
                        href={`/movies/${movieGenre.genre_id}`}
                        className="bg-aprimary px-2 rounded"
                      >
                        {movieGenre.genre_name}
                      </a>
                    ))}
                  </span>
                </div>
                <div className="mt-10 bg-transparent flex space-x-4 text-2xl">
                  <a
                    href={`play`}
                    className="flex items-center w-fit bg-aprimary px-2 rounded border border-aprimary hover:bg-primary"
                  >
                    <FaPlayCircle className="mr-2 bg-transparent" />
                    Full Movie
                  </a>
                </div>
              </div>
              <div className="w-2/4 h-full flex flex-col my-2 justify-start items-start px-4 bg-transparent">
                <div className="text-xl bg-transparent mb-2">
                  <p className="bg-transparent">Share to social media</p>
                  <Button className="m-2">
                    <FaFacebook className="bg-transparent" />
                  </Button>
                  <Button className="m-2">
                    <FaTwitter className="bg-transparent" />
                  </Button>
                  <Button className="m-2">
                    <FaTiktok className="bg-transparent" />
                  </Button>
                  <Button className="m-2">
                    <FaInstagram className="bg-transparent" />
                  </Button>
                </div>
                <div className="w-full bg-transparent my-2">
                  <UserRating movieId={movie?.id} title={movie?.title} />
                </div>
                <div className="w-full bg-transparent my-2">
                  {saved ? (
                    <>
                      <p>You Can Unsave this movie!</p>
                      <ButtonAction
                        text="UnSave"
                        onClick={handleUnsaveMovie}
                        icon={<FaRegBookmark className="bg-transparent" />}
                      />
                    </>
                  ) : (
                    <>
                      <p>You Can Save this movie!</p>
                      <ButtonAction
                        text="Save"
                        onClick={handleSaveMovie}
                        icon={<FaBookmark className="bg-transparent" />}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <div className="my-2 border-t border-red py-4 w-full">
            <label htmlFor="" className="text-2xl px-3 font-bold text-aprimary">
              Trailer
            </label>
            <div className="my-4 px-3 flex overflow-x-scroll scrollbar-hide group w-full">
              {loading ? (
                <Loading value="Loading..." loading={true} />
              ) : movieVideos?.length > 0 ? (
                movieVideos?.map((movieVideo: any, index: number) => (
                  <div key={index} className="m-2">
                    <ReactPlayer
                      url={movieVideo?.video}
                      controls
                      volume={0.5}
                      width="400px"
                      height="300px"
                    />
                  </div>
                ))
              ) : (
                <Loading value={errorMovieVideos} loading={false} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="my-2 border-t border-red py-4 w-8/12">
            <label htmlFor="" className="text-2xl px-3 font-bold text-aprimary">
              Cast
            </label>
            <div className="my-4 px-3 relative flex overflow-x-scroll scrollbar-hide group w-full">
              {loading ? (
                <Loading value="Loading..." loading={true} />
              ) : movieArtists?.length > 0 ? (
                movieArtists?.map((movieArtist: any) => {
                  if (
                    movieArtist.role_name !== "Director" &&
                    movieArtist.role_name !== "Producer"
                  ) {
                    return (
                      <div key={movieArtist.id} className="w-44 flex-shrink-0">
                        <img
                          className="h-40 w-40 object-cover border"
                          src={movieArtist.artist_profile_image}
                          alt={movieArtist.artist_name}
                        />
                        <div className="flex items-center mt-2 space-x-2">
                          <p className="text-balance">
                            {movieArtist.artist_name}
                          </p>
                        </div>
                        <span className="flex items-center mt-2 text-xs space-x-2">
                          <p className="text-aprimary">
                            {movieArtist.movie_artist_name}
                          </p>
                        </span>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <Loading value={errorMovieArtists} loading={false} />
              )}
            </div>
          </div>

          <div className="my-2 border-t border-red py-4 w-3/12">
            <label htmlFor="" className="text-2xl px-3 font-bold text-aprimary">
              Director
            </label>
            <div className="my-4 px-3 relative flex items-center overflow-x-scroll scrollbar-hide group w-full">
              {loading ? (
                <Loading value="Loading..." loading={true} />
              ) : movieArtists?.length > 0 ? (
                movieArtists?.map((movieArtist: any) =>
                  movieArtist.role_name === "Director" ||
                  movieArtist.role_name === "Producer" ? (
                    <div key={movieArtist.id} className="w-44 flex-shrink-0">
                      <img
                        className="h-40 w-40 object-cover border"
                        src={movieArtist.artist_profile_image}
                        alt={movieArtist.artist_name}
                      />
                      <span className="flex items-center mt-2 space-x-2">
                        <p>{movieArtist.artist_name}</p>
                      </span>
                      <span className="flex items-center mt-2 text-xs space-x-2">
                        <p className="text-aprimary">{movieArtist.role_name}</p>
                      </span>
                    </div>
                  ) : null
                )
              ) : (
                <Loading value={errorMovieArtists} loading={false} />
              )}
            </div>
          </div>
        </div>
        <div className="my-2 border-y border-red py-4">
          <label htmlFor="" className="text-2xl px-3 font-bold text-aprimary">
            Thumbnail
          </label>
          <div className="my-4 px-3 relative flex h-48 items-center overflow-x-scroll scrollbar-hide group">
            {loading ? (
              <Loading value="Loading..." loading={true} />
            ) : moviePhotos?.length > 0 ? (
              moviePhotos.map((moviePhoto: any) => (
                <img
                  key={moviePhoto.id}
                  className="h-40 w-80 object-cover m-2 border"
                  src={moviePhoto?.photo_image}
                  alt="thumbnail"
                />
              ))
            ) : (
              <Loading value={errorMoviePhotos} loading={false} />
            )}
          </div>
        </div>
        <div className="my-4">
          <LabelCategory htmlFor="maybeyoulike" textLabel="Maybe You Like" />
        </div>
      </div>
    </AppLayout>
  );
};

export default MovieDetail;
