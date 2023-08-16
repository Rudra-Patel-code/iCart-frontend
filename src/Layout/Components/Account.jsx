import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

const Account = ({ isAuth }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="">
      {!isAuth ? (
        <div className="flex gap-3 text-xs sm:text-sm md:text-base">
          <Link
            to="/login"
            className="px-3 py-1 transition-all hover:border-2 hover:text-purple-500 hover:bg-white hover:border-purple-500 rounded bg-purple-500 text-white "
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 rounded border-2 border-purple-500 text-purple-500 hover:border-none hover:text-white hover:bg-purple-500  "
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex gap-3 text-xs sm:text-sm md:text-base">
          <Link
            onClick={handleLogout}
            className="px-3 py-[4px] transition-all  rounded bg-red-500 text-white "
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Account;
