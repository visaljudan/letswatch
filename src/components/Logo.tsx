import LetsWatch from "../assets/logo.png";
export const Logo = () => {
  return (
    <a className="bg-transparent" href="/">
      <img src={LetsWatch} alt="logo" className="w-64 h-20 bg-transparent" />
    </a>
  );
};
