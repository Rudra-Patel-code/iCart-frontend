import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import ReactStars from "react-stars";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  deleteProductAction,
  getProduct,
} from "../../../redux/actions/productAction";
import { FaSpinner } from "react-icons/fa";

const ProductCard = ({
  title,
  image,
  description,
  price,
  id,
  stock,
  totalRatings,
  openEditModel,
  reviews,
  deleteLoading,
  deleteProduct,
}) => {
  return (
    <>
      <div className="border-2 border-slate-100 shadow-xl rounded-lg p-3">
        <div>
          <img src={image} className="aspect-square object-contain" />
        </div>

        <div className="mt-3 flex flex-col  gap-1 sm:gap-2 ">
          <p className="text-xs sm:text-sm">{title}</p>
          <p className=" text-[10px] flex flex-wrap sm:text-xs text-slate-600  break-all ">
            {description.substring(0, 25)} ...
          </p>
          <p className="text-purple-700 text-sm sm:text-base">₹ {price}</p>
          <div className="flex z-[-1] flex-wrap items-center">
            <ReactStars count={5} value={3.5} size={15} half />
            <p className="text-xs">( {reviews.length} )</p>
          </div>
        </div>

        <div className="flex justify-around mt-1 sm:mt-3 text-xl">
          <button
            onClick={() => openEditModel(id)}
            className="flex items-center gap-1 outline-none hover:cursor-pointer py-2 px-3 text-purple-600"
          >
            <BiEdit />
            <span className="text-xs hidden sm:block">Edit</span>
          </button>
          <button
            onClick={() => deleteProduct(id)}
            disabled={deleteLoading ? true : false}
            className="flex items-center gap-1 outline-none  hover:cursor-pointer pointer-events-auto py-2 px-3 text-red-500"
          >
            {deleteLoading ? (
              <FaSpinner className="animate-spin mx-auto text-xl" />
            ) : (
              <>
                <AiOutlineDelete />
                <span className="text-xs hidden sm:block">Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
