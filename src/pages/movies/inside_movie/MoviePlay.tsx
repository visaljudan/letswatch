import { useParams } from "react-router-dom";
import AppLayout from "../../../layout/AppLayout";
import VideoPlayer from "../../../components/VideoPlayer";
import Poster from "../../../components/Poster";
import { LabelCategory } from "../../../components/Label";
import Video from "../../../assets/Video.mp4";
import Thumbnail from "../../../assets/Cover.png";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";

const MoviePlay = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<any>([]);
  const [errorMovie, setErrorMovie] = useState<any>([]);

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
  useEffect(() => {
    if (id) {
      fetchMovieById(id);
    }
  });
  return (
    <AppLayout>
      <>
        <div className="text-sm my-4 z-0 top-0">
          <a href="/" className="mr-2 hover:underline">
            Home
          </a>
          <span className="mr-2">&gt;</span>
          <a href="movies" className="mr-2 hover:underline">
            Movies
          </a>
          <span className="mr-2">&gt;</span>
          <a href="detail">
            <span className="mr-2 hover:underline">{movie.title}</span>
          </a>
          <span className="mr-2">&gt;</span>
          <span className="underline text-aprimary">Watch Now</span>
        </div>
        {/* Movies */}
        <p className="my-8 text-4xl font-bold text-aprimary text-center">
          {movie.title}
        </p>
        <VideoPlayer />
      </>
      <div className="my-4">
        <LabelCategory htmlFor="maybeyoulike" textLabel="Maybe You Like" />
      </div>
    </AppLayout>
  );
};

export default MoviePlay;
