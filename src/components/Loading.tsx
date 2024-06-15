import { ReactNode } from "react";
import ReactPlayer from "react-player";
interface LoadingItem {
  value?: any;
  loading?: boolean;
}
const Loading: React.FC<LoadingItem> = ({ value, loading }) => {
  return (
    <div className="flex flex-col justify-center items-center h-60 w-full">
      {loading ? (
        <>
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-aprimary border-r-transparent"></div>
          <p className="text-2xl">{value}</p>
        </>
      ) : (
        <p className="text-2xl">{value}</p>
      )}
    </div>
  );
};

export default Loading;
