import Input from "../../components/Input";
import { Label, LabelCategory } from "../../components/Label";
import { Link } from "../../components/Link";
import AdminLayout from "../layout/AdminLayout";
import data from "../../data/movieCover.json";
import Poster from "../../components/Poster";

const AdminMovies = () => {
  return <AdminLayout>"</AdminLayout>;
};

export default AdminMovies;

{
  /* <div className="w-full flex ">
<div className="w-full flex flex-col">
  <Label htmlFor="movies" textLabel="Movies" />
  <Input type="text" placeholder="Fillter" onChange={}/>
  <input type="text" className="border border-aprimary w-96 my-2" />
  <LabelCategory htmlFor="popluar" textLabel="Popular" />
  
  <div className="flex items-center justify-between flex-wrap w-fulld mr-2">
    {data.map((movie, index) => (
      <Poster
        id={id}
        key={index}
        movieName={movie.movieName}
        imageUrl={movie.imageUrl}
      />
    ))}
  </div>
</div>
<div className="pl-3 h-auto w-60 my-2 border-l border-aprimary">
  <ul className="my-2">
    <Link url="dashboard" title="Upload Movies" />
  </ul>
  <ul className="my-2">
    <Link url="movies" title="Movies" />
  </ul>
  <ul className="my-2">
    <Link url="/" title="TV-Show" />
  </ul>
</div>
</div> */
}
