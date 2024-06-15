import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSadCry, FaTv } from "react-icons/fa";
import { SliderGroup } from "../components/slider/Slider";
import { LabelCategory } from "../components/Label";
import AppLayout from "../layout/AppLayout";
import Slider from "react-slick";
import Poster from "../components/Poster";
import axios from "../api/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pusher from "pusher-js";
import Loading from "../components/Loading";
import echo from "../utils/echo";

interface Movie {
  id: number;
  tv_show_id: number | null;
  title: string;
  overview: string;
  run_time: number;
  release_date: string;
  poster_image: string;
  cover_image: string;
  trailer_url: string;
  total_likes: number;
  total_ratings: number;
  average_rating: string;
  popularity: number;
  terms_status: string;
  upload_status: string;
  user_subscription: boolean;
  expire_subscription: string | null;
  last_upload_date: string;
}

const HomePage: React.FC = () => {
  // Slider settings
  const settings = {
    dots: true,
    arrows: false,
    arrowsClass: "",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "custom-dots",
  };

  const sliderRef = useRef<Slider>(null);

  const handlePrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMovies, setErrorMovies] = useState<any>([]);
  const [movieGenres, setMovieGenres] = useState<any>([]);
  const [errorMovieGenres, setErrorMovieGenres] = useState<any>([]);
  const [moviesLatest, setMoviesLatest] = useState<any>([]);
  const [errorMoviesLatest, setErrorMoviesLatest] = useState<any>([]);
  const [moviesPopluar, setMoviesPopluar] = useState<any>([]);
  const [errorMoviesPopluar, setErrorMoviesPopluar] = useState<any>([]);
  const [moviesTopRated, setMoviesTopRated] = useState<any>([]);
  const [errorMoviesTopRated, setErrorMoviesTopRated] = useState<any>([]);

  //Fetch all movie
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

  // Fetch genres of movie
  const fetchMovieGenres = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("/movie_genres");
      const data = await response.data;

      if (!data.success === true) {
        setLoading(false);
        setErrorMovieGenres(data.message);
        return;
      }

      setLoading(false);
      setMovieGenres(data.data);
    } catch (error) {
      setErrorMovieGenres(error);
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
    fetchMovieGenres();
    fetchLatest();
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <AppLayout page="home">
      <div className=" container-slider flex justify-center items-center my-2">
        <div className="btn-arrow ">
          <button onClick={handlePrevSlide}>
            <FaAngleLeft className="arrow-slide" />
          </button>
        </div>
        {loading ? (
          <Loading value="loading..." loading={true} />
        ) : (
          <Slider ref={sliderRef} {...settings} className="silder">
            {movies?.map((movie: any) => (
              <SliderGroup
                key={movie.id}
                id={movie.id}
                imageUrl={movie.cover_image}
                title={movie.title}
                description={movie.overview}
                genre={movieGenres
                  ?.filter(
                    (movieGenre: any) => movieGenre.movie_id === movie.id
                  )
                  .map((movieGenre: any, index: number) => (
                    <span
                      key={movieGenre.id || index}
                      className="space-x-2 ml-2"
                    >
                      <a
                        href={`/movies/${movieGenre.genre_id}`}
                        key={movieGenre.id}
                        className="hover:font-bold text-aprimary"
                      >
                        {movieGenre.genre_name}
                      </a>
                    </span>
                  ))}
                duration={movie.run_time}
                releaseYear={movie.release_date}
                imdb={movie.average_rating}
              />
            ))}
          </Slider>
        )}
        <div className="btn-arrow">
          <button onClick={handleNextSlide}>
            <FaAngleRight className="arrow-slide" />
          </button>
        </div>
      </div>
      <LabelCategory
        htmlFor="popular"
        textLabel="Popular"
        link={true}
        linkValue="See more"
      />
      {loading ? (
        <Loading value="loading..." loading={true} />
      ) : moviesPopluar?.length > 0 ? (
        <div className="flex m-4">
          {moviesPopluar?.map((movie: any) => (
            <div key={movie.id} className="m-2">
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
      <LabelCategory
        htmlFor="top-rated"
        textLabel="Top Rated"
        link={true}
        linkValue="See more"
      />
      {loading ? (
        <Loading value="loading..." loading={true} />
      ) : moviesTopRated?.length > 0 ? (
        <div className="flex m-4">
          {moviesTopRated?.map((movie: any) => (
            <div key={movie.id} className="m-2">
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
      <LabelCategory
        htmlFor="latest-movies"
        textLabel="Latest Movie"
        link={true}
        linkValue="See more"
      />
      {loading ? (
        <Loading value="loading..." loading={true} />
      ) : moviesLatest?.length > 0 ? (
        <div className="flex m-4">
          {moviesLatest?.map((movie: any) => (
            <div key={movie.id} className="m-2">
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
      <LabelCategory htmlFor="all-movies" textLabel="All Movies" />
      {loading ? (
        <Loading value="loading..." loading={true} />
      ) : moviesLatest?.length > 0 ? (
        <div className="flex m-4">
          {moviesLatest
            ?.slice()
            .sort(() => 0.5 - Math.random())
            .map((movie: any) => (
              <div key={movie.id} className="m-2">
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
    </AppLayout>
  );
};

export default HomePage;
