import { useState } from "react";
import { ImCross } from "react-icons/im";

import CreateProductModel from "./Components/CreateProductModel";

const CreateProduct = () => {
  const [createProductModel, setCreateproductModel] = useState(false);

  const openModel = () => {
    setCreateproductModel(true);
  };

  const closeModel = () => setCreateproductModel(false);

  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="text-center mt-4 ">
          <h4
            onClick={openModel}
            className="text-xs text-slate-100 hover:cursor-pointer hover:bg-purple-800 rounded-lg px-3.5 p-2 mx-auto md:text-base w-fit bg-purple-700"
          >
            Create Product
          </h4>
          <div className="border border-slate-500 w-[50%] md:w-[35%] lg:w-[20%] mx-auto my-3"></div>
        </div>
      </div>

      <div className={`${createProductModel ? "visible" : "hidden"}`}>
        <div className="fixed bg top-0 left-0 backdrop-blur-[2px] w-[100%] h-[100%] overflow-auto flex justify-center items-center bg-[rgba(193,193,193,0.58)]">
          <div
            onClick={closeModel}
            className="fixed top-4 right-4 hover:cursor-pointer"
          >
            <ImCross />
          </div>
          <div className="z-10">
            <CreateProductModel />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
