import { FC } from "react";
import { FaTv } from "react-icons/fa";
import "./Silder.scss";
import { Link } from "../Link";
import { ButtonLink } from "../Button";

interface SliderGroupProps {
  imageUrl: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  releaseYear: string;
  imdb: string;
  id: string;
}

export const SliderGroup: FC<SliderGroupProps> = ({
  imageUrl,
  title,
  description,
  genre,
  duration,
  releaseYear,
  imdb,
  id,
}) => {
  return (
    <div className="silder-group group">
      <a href={`/movies/${id}/detail`}>
        <img className="silder-image" src={imageUrl} alt={title} />
      </a>
      <div className=" group-hover:opacity-80 absolute border-r-4 border-aprimary top-0 right-0 w-96 h-96 flex flex-col items-center px-4 py-2 bg-primary opacity-0 transition-opacity duration-300 hover:opacity-80">
        <a
          href="/"
          className=" text-3xl text-aprimary font-bold opacity-100 transition-opacity duration-300 my-2"
        >
          {title}
        </a>
        <span className="opacity-100 transition-opacity duration-300 my-2">
          {description}
        </span>
        <div className="h-40 w-full border border-aprimary my-2 p-2 flex flex-col justify-between">
          <span key={id}>Genre : {genre}</span>
          <span>
            Duration: <span>{duration}min</span>
          </span>
          <span>
            Release: <span>{releaseYear}</span>
          </span>
          <span>
            IMDB:{" "}
            <span className="bg-warning px-2 text-center text-primary">
              {imdb}
            </span>
          </span>
        </div>
        <ButtonLink
          href={`/movies/${id}/detail`}
          text="Watching"
          icon={
            <FaTv style={{ fill: "white", backgroundColor: "transparent" }} />
          }
        />
      </div>
    </div>
  );
};
