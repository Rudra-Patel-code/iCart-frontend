import { useState } from "react";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome, AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import Account from "./Components/Account";
import { useSelector } from "react-redux";

export const linkStyles =
  "flex py-1 px-2 my-2 rounded-md hover:bg-slate-300 justify-start text-base items-center gap-2 z-10 ";

const Header = ({ isSearchBar = true }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [isSideBar, setIsSideBar] = useState(false);

  const closeSidebar = () => setIsSideBar(false);
  const openSidebar = () => setIsSideBar(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="sticky ml-[50%]  translate-x-[-50%] top-0 left-0 text-black  w-[100%] h-[100%]  ">
        <div className="flex p-3 items-center bg-white bg-opacity-[0.7] ">
          <div className="flex items-center p-2 gap-2 flex-1 ">
            <GiHamburgerMenu
              className={`text-xl hover:cursor-pointer md:text-2xl ${
                isSideBar ? "hidden" : "block"
              } `}
              onClick={openSidebar}
            />
            <ImCross
              className={`text-xl hover:cursor-pointer md:text-2xl ${
                isSideBar ? "block" : "hidden"
              }`}
              onClick={closeSidebar}
            />
            <h1 className="text-xl md:text-2xl hover:cursor-pointer hover:text-purple-500 hover:underline font-bold text-purple-700">
              iCart
            </h1>
          </div>

          {!isSideBar && (
            <>
              <div
                className={`hidden flex-1 ${
                  isSearchBar ? "md:block" : "md:hidden"
                }  mr-3`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      className="border-2  w-[100%]   focus:outline-none px-3 py-1 focus:border-purple-500 border-slate-400 rounded-md "
                    />
                    <div className="px-3 py-[5.5px] bg-purple-500 cursor-pointer rounded-md text-white">
                      <AiOutlineSearch className="text-xl md:text-2xl" />
                    </div>
                  </div>
                </form>
              </div>
              <Account isAuth={isAuth} />
            </>
          )}
        </div>

        <div
          className={` z-10 ${
            isSideBar ? "visible" : "hidden"
          } absolute bg-white w-[100%] h-[100vh] `}
        >
          <div className=" w-fit m-auto">
            <Link to={"/"} onClick={closeSidebar} className={linkStyles}>
              <AiFillHome />
              Home
            </Link>

            <Link to={"/cart"} onClick={closeSidebar} className={linkStyles}>
              <BsFillCartFill />
              Cart{" "}
              {cart && (
                <>
                  <span>( {cart.length} )</span>
                </>
              )}
            </Link>

            <Link
              to={"/recommended"}
              onClick={closeSidebar}
              className={linkStyles}
            >
              <TbSquareRoundedCheckFilled />
              Recommended
            </Link>

            <Link
              to={"/favourites"}
              onClick={closeSidebar}
              className={linkStyles}
            >
              <AiFillStar />
              Favourites
            </Link>

            {user?.role === "admin" && (
              <Link
                to={"/dashboard/products"}
                onClick={closeSidebar}
                className={linkStyles}
              >
                <MdDashboardCustomize />
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
