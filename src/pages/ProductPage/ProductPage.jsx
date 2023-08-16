// Import React and other dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars"; // A simple star rating component for your React projects [^1^][1]
import {
  getSingleProduct,
  handleReviews,
} from "../../redux/actions/productAction";
import Header from "../../Layout/Header";
import { toast } from "react-hot-toast";
import GoBack from "../../Layout/Components/GoBack";

// Define a custom component for displaying a single review
const Review = ({ review }) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <h4 className="text-sm text-slate-400">- {review.user.name}</h4>
      </div>
      <div className="flex items-center mb-2">
        <ReactStars
          count={5}
          value={review.rating}
          size={16}
          color1="#e5e7eb"
          color2="#fbbf24"
          edit={false}
        />
        {/* <span className="text-xs text-gray-500 ml-2">
          {review.date.toLocaleDateString()}
        </span> */}
      </div>
      <p className="text-sm text-gray-700">{review.comment}</p>
    </div>
  );
};

// Define a custom component for displaying the product details
const ProductPage = () => {
  // Get the product and reviews data from the redux store
  const {
    singleProduct: product,
    getSingleProductLoading,
    error,
    message,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, message, dispatch]);

  // Define a local state for storing the user's rating and comment
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Define a handler function for submitting the review
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleReviews(id, comment, rating));
    dispatch(getSingleProduct(id));
    setRating(0);
    setComment("");
  };

  return (
    <>
      <Header />
      <GoBack to="/products" />
      {getSingleProductLoading && !product ? (
        <>
          <h1 className="text-center text-lg font-medium text-gray-800">
            Fetching Details ...
          </h1>
        </>
      ) : (
        <>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              {/* Product image */}
              <div className="w-full md:w-1/2">
                <img
                  src={product?.image.url}
                  alt={product?.title}
                  className="w-[80%]"
                />
              </div>
              {/* Product info */}
              <div className="w-full md:w-1/2">
                <h1 className="text-2xl font-bold text-gray-800">
                  {product?.title}
                </h1>
                <div className="flex items-center my-4">
                  <ReactStars
                    count={5}
                    value={product?.totalRatings}
                    size={20}
                    color1="#e5e7eb"
                    color2="#fbbf24"
                    edit={false}
                    className="z-[-10]"
                  />
                  <span className="text-md text-gray-500 ml-2">
                    ({product?.reviews.length} ratings)
                  </span>
                </div>
                <p className="text-md text-gray-700 mb-4">
                  {product?.description}
                </p>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-gray-800 mr-2">
                    ${product?.price}
                  </span>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                  Add to cart
                </button>
              </div>
            </div>
            {/* Reviews section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
              {/* User review form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your rating
                </label>
                <ReactStars
                  id="rating"
                  count={5}
                  value={rating}
                  size={20}
                  color1="#e5e7eb"
                  color2="#fbbf24"
                  onChange={(newRating) => setRating(newRating)}
                />
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mt-4 mb-2"
                >
                  Your comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                  placeholder="Write your review here..."
                ></textarea>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 mt-4"
                >
                  Submit
                </button>
              </form>
              {/* List of reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product?.reviews.map((review) => (
                  <Review key={review._id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
