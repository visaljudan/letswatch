const NotFound = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <img
        className="w-96 object-cover my-4"
        src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png"
        alt=""
      />
      <p className="text-4xl text-aprimary">404</p>
      <p className="text-xl ">Not Found page</p>
    </div>
  );
};

export default NotFound;
