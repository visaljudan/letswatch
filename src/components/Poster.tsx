// CoverPosterMovie.tsx
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { LinkButton } from "./Link";

interface CoverPosterMovieProps {
  imageUrl: string;
  movieName: string;
  id: number;
}

const Poster: React.FC<CoverPosterMovieProps> = ({
  imageUrl,
  movieName,
  id,
}) => {
  return (
    <div
      // href={`/movies/${movieName}/detail`}
      className="relative inline-block group "
    >
      <img
        src={imageUrl}
        alt="Movie Poster"
        className="w-40 h-60 object-cover"
      />
      <div className="w-40 h-60 absolute top-0 opacity-0 flex flex-col justify-center items-center cursor-pointer transition-opacity group-hover:opacity-80">
        <LinkButton
          url={`/movies/${id}/detail`}
          icon={
            <FaPlayCircle fill="red" className="bg-transparent" size="32" />
          }
          className="w-full h-full flex flex-col items-center justify-center text-center"
          text={movieName}
        />
      </div>
    </div>
  );
};

export default Poster;
