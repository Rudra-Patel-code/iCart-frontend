import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { linkStyles } from "../../../Layout/Header";
import { AiFillHome, AiFillShopping } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const AdminHeader = () => {
  const [isSideBar, setIsSideBar] = useState(false);

  const openSidebar = () => setIsSideBar(true);
  const closeSidebar = () => setIsSideBar(false);
  return (
    <>
      <div>
        <GiHamburgerMenu
          className={`text-xl m-4  hover:cursor-pointer md:text-2xl ${
            isSideBar ? "hidden" : "block"
          } `}
          onClick={openSidebar}
        />
        <div
          className={`mt-5 bg-white ${
            isSideBar ? "visible" : "hidden"
          } fixed top-0 left-0  w-[100%] h-[100%] mt-0 `}
          style={{ zIndex: 1 }}
        >
          <ImCross
            className={`text-xl hover:cursor-pointer md:text-2xl m-4 ${
              isSideBar ? "block" : "hidden"
            }`}
            onClick={closeSidebar}
          />
          <div className="w-fit m-auto flex flex-col ">
            <Link to={"/"} onClick={closeSidebar} className={linkStyles}>
              <AiFillHome />
              Home
            </Link>
            <Link
              to="/dashboard/products"
              onClick={closeSidebar}
              className={`${linkStyles}`}
            >
              <AiFillShopping />
              Products
            </Link>

            <Link
              to="/dashboard/categories"
              onClick={closeSidebar}
              className={`${linkStyles}`}
            >
              <MdCategory />
              Categories
            </Link>

            <Link
              to="/dashboard/users"
              onClick={closeSidebar}
              className={`${linkStyles}`}
            >
              <FaUserAlt />
              Users
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
