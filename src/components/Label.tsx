import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "./Link";

interface LabelProps {
  id?: string;
  htmlFor?: string;
  className?: string;
  textLabel?: string;
  link?: boolean;
  linkValue?: string;
}

//Label for input
export const LabelInput: React.FC<LabelProps> = ({ htmlFor, textLabel }) => {
  return (
    <label htmlFor={htmlFor} className="my-2 px-4 py-0 text-base">
      {textLabel}
    </label>
  );
};

//Label for Main title
export const Label: React.FC<LabelProps> = ({ htmlFor, textLabel }) => {
  return (
    <label htmlFor={htmlFor} className="text-3xl tex-start m-2 font-bold">
      {textLabel}
    </label>
  );
};

//Label for movie genre
export const LabelCategory: React.FC<LabelProps> = ({
  textLabel,
  link,
  linkValue,
  htmlFor,
}) => {
  return (
    <div className="bg-aprimary w-full flex items-center justify-between text-2xl px-3 ">
      <label className="bg-transparent" htmlFor={htmlFor}>
        {textLabel}
      </label>
      {link ? (
        <span className="flex items-center justify-center bg-transparent text-lg">
          <FaAngleDoubleRight
            style={{ backgroundColor: "transparent", marginRight: "4px" }}
          />
          <a href={`/${htmlFor}`} className="link-bg-red">
            {linkValue}
          </a>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
