import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ToHome = ({ to = "/" }) => {
  return (
    <div className="absolute top-4 left-4 text-2xl md:text-3xl ">
      <Link to={to}>
        <BsFillArrowLeftCircleFill />
      </Link>
    </div>
  );
};

export default ToHome;
