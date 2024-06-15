import { FaCamera } from "react-icons/fa";

const Box = () => {
  return (
    <div className="box-color">
      <div className="top-bar">
        <div className="box-icon">
          <FaCamera />
        </div>
        <div className="right-bar">
          <span>$12145</span>
          <p>Income status</p>
        </div>
      </div>
      <div className="relative pt-1 mt-4">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span>Target</span>
          </div>
          <div className="text-right">
            <span className="text-md font-semibold inline-block text-white-600">
              50%
            </span>
          </div>
        </div>
        <div className="overflow-hidden mt-3 h-2 text-xs flex rounded bg-gray-200">
          <div className="w-40 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Box;
