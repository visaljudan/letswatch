import { FaCheckCircle, FaFilm, FaHome, FaTv, FaUser } from "react-icons/fa";
import { Link } from "../../components/Link";

const Silder = () => {
  return (
    <div className="pl-3 h-96 w-64 my-2 shadow-md shadow-shadow mr-2">
      <ul className="my-2">
        <Link url="dashboard" title="Home" icon={<FaHome />} />
      </ul>
      <ul className="my-2">
        <Link
          url="admin-request"
          title="Confirm Admin"
          icon={<FaCheckCircle />}
        />
      </ul>
      <ul className="my-2">
        <Link url="movies" title="Movies" icon={<FaFilm />} />
      </ul>
      <ul className="my-2">
        <Link url="/" title="TV-Show" icon={<FaTv />} />
      </ul>
      <ul className="my-2">
        <Link url="/" title="Users" icon={<FaUser />} />
      </ul>
      <ul className="my-2">
        <Link url="/" title="Setting" icon={<FaUser />} />
      </ul>
    </div>
  );
};

export default Silder;
