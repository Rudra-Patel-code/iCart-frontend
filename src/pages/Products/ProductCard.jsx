import React from "react";
import ReactStars from "react-stars";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../../redux/actions/productAction";

const ProductCard = ({
  image,
  stock,
  price,
  title,
  description,
  totalRatings,
  reviews,
  id,
  addToCart,
  addingId,
  addLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewProduct = () => {
    navigate(`/products/${id}`);
    dispatch(getSingleProduct(id));
  };

  return (
    <>
      <div className="border-2 border-slate-100 shadow-xl rounded-lg p-3 hover:cursor-default  ">
        <div>
          <img src={image} className="aspect-square object-contain" />
        </div>

        <div className="mt-3 flex flex-col  gap-1 sm:gap-2 ">
          <p className="text-xs sm:text-sm">{title}</p>
          <p className=" text-[10px] flex flex-wrap sm:text-xs text-slate-600  break-all ">
            {description.substring(0, 25)} ...
          </p>
          <p className="text-purple-700 text-sm sm:text-base">₹ {price}</p>
          <div className="flex  flex-wrap items-center z-[-10]">
            <ReactStars count={5} value={totalRatings} size={15} half />
            <p className="text-xs">( {reviews.length} )</p>
          </div>
        </div>

        <div className=" text-center text-xs mt-2 flex flex-col gap-2">
          <button
            onClick={() => addToCart(id)}
            disabled={addingId === id && addLoading ? true : false}
            className="border-2 border-purple-400 p-1 rounded-md text-purple-600  mx-auto"
          >
            {addingId === id && addLoading ? (
              <span>
                <FaSpinner className="animate-spin" />
              </span>
            ) : (
              <>Add To Cart</>
            )}
          </button>
          <button
            onClick={viewProduct}
            className="border-2 border-slate-500 p-1 rounded-md text-black-600 mx-auto"
          >
            View Product
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
