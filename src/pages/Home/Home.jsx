import React from "react";
import Header from "../../Layout/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className=" flex flex-col items-center p-5 gap-5  justify-center  bg-gradient-to-br from-purple-900  bg-no-repeat bg-cover bg-center  w-full h-[100vh] ">
        <div className="flex flex-col gap-3">
          <h1 className="mt-[-30%] text-xl">
            <span className="text-3xl text-white">
              Shop smart, <br />
              save big,
              <br /> and discover more.
            </span>{" "}
            <br />
            <span className="text-lg text-white">
              This is the ecommerce website you’ve been looking for.
            </span>
          </h1>
          <button
            onClick={() => navigate("/products")}
            className=" z-[2] rounded-lg self-start  text-white border-2 border-white p-2 hover:cursor-pointer hover:border-purple-900 hover:text-purple-900"
          >
            View Products
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
