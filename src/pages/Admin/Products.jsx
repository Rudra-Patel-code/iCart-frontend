import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSoundModuleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";

import {
  deleteProductAction,
  getOneProduct,
  getProduct,
} from "../../redux/actions/productAction";
import ProductCard from "./Components/ProductCard";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import EditProductModel from "./Components/EditProductModel";
import { ImCross } from "react-icons/im";
import FilterModel from "./Components/FilterModel";
import { current } from "@reduxjs/toolkit";
import NoProduct from "../../Layout/Components/NoProduct";

const Products = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isEditModel, setIsEditModel] = useState(false);
  const [isFilterModel, setIsFilterModel] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const closeEditModel = () => setIsEditModel(false);

  const {
    products,
    productloading,
    error,
    totalPage,
    totalProducts,
    message,
    oneProduct,
    getoneProductLoading,
    deleteLoading,
  } = useSelector((state) => state.product);

  const clearAllFilters = () => {
    setMaxPrice("");
    setMinPrice("");
    setPage(1);
    closeFilterModel();
    dispatch(getProduct(searchKeyword, "", "", 1));
  };

  const applyFilter = (range) => {
    setMinPrice(range[0]);
    setMaxPrice(range[0]);
    closeFilterModel();
    dispatch(getProduct(searchKeyword, range[0], range[1], page));
  };

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
    dispatch(getProduct(searchKeyword, minPrice, maxPrice, currentPage));
  };

  const openFilterModel = () => setIsFilterModel(true);
  const closeFilterModel = () => setIsFilterModel(false);

  const openEditModel = (id) => {
    setIsEditModel(true);
    if (!oneProduct || oneProduct._id.toString() !== id.toString())
      dispatch(getOneProduct(id));
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(getProduct(searchKeyword, minPrice, maxPrice, 1));
  };

  const deleteProduct = async (id) => {
    await dispatch(deleteProductAction(id));
    dispatch(getProduct(searchKeyword, minPrice, maxPrice, page));
  };

  useEffect(() => {
    const dispatchAsync = async () => {
      await dispatch({ type: "clearMessage" });
      setPage(1);
      await dispatch(getProduct());
    };

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    setPage(1);
    dispatch(getProduct());
  }, []);

  return (
    <>
      <div className="flex items-center justify-around mb-10 max-w-2xl mx-auto">
        <div
          className="text-lg hover:cursor-pointer hover:text-purple-600  "
          onClick={openFilterModel}
        >
          <RiSoundModuleLine />
        </div>

        <form onSubmit={searchSubmit} className=" flex-[0.7] md:mr-4">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border-2  w-[100%]   focus:outline-none px-3 py-1 focus:border-purple-500 text-xs md:text-sm border-slate-400 rounded-md "
            />
            <button
              type="submit"
              className="px-2 py-[5.5px] outline-none  bg-purple-500 cursor-pointer rounded-md text-white"
            >
              <AiOutlineSearch className="text-base md:text-xl" />
            </button>
          </div>
        </form>
      </div>
      {productloading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 max-w-4xl mx-auto px-3">
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.image.url}
                  stock={product.stock}
                  price={product.price}
                  title={product.title}
                  description={product.description}
                  totalRatings={product.totalRatings}
                  reviews={product.reviews}
                  deleteLoading={deleteLoading}
                  deleteProduct={deleteProduct}
                  openEditModel={openEditModel}
                />
              ))}
          </div>

          {!totalProducts && (
            <>
              <NoProduct />
            </>
          )}
        </>
      )}
      {totalProducts && (
        <>
          <div className="text-center py-3 z-[-1] ">
            <p className="p-2 text-sm bott text-slate-500">
              Total Page - {totalPage}
            </p>

            <Pagination
              activePage={page}
              itemsCountPerPage={8}
              totalItemsCount={totalProducts}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="bg-white z-[0] bottom-2 border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              linkClass="page-link"
              firstPageText="First"
              lastPageText="Last"
              innerClass="relative  inline-flex rounded-md shadow-sm -space-x-px"
              activeClass="bg-indigo-50 border-purple-700 text-purple-700 relative inline-flex items-center md:px-4 md:py-2 border text-sm font-medium"
              itemClassFirst="relative inline-flex items-center md:px-2 md:py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              itemClassLast="relative inline-flex items-center md:px-2 md:py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            />
          </div>
        </>
      )}

      <div className={`${isEditModel ? "visible" : "hidden"}`}>
        <div className="fixed bg top-0 left-0 backdrop-blur-[2px] w-[100%] h-[100%] overflow-auto flex justify-center items-center bg-[rgba(193,193,193,0.58)]">
          <div
            onClick={closeEditModel}
            className="fixed top-4 right-4 hover:cursor-pointer"
          >
            <ImCross />
          </div>

          {!oneProduct || getoneProductLoading ? (
            <>
              <div className="animate-spin text-2xl">
                <FaSpinner />
              </div>
            </>
          ) : (
            <div className="z-10">
              <EditProductModel product={oneProduct} />
            </div>
          )}
        </div>
      </div>

      {/* Filters Model */}

      <div className={`${isFilterModel ? "visible" : "hidden"}`}>
        <div className="fixed bg top-0 left-0 backdrop-blur-[2px] w-[100%] h-[100%] overflow-auto flex justify-center items-center bg-[rgba(193,193,193,0.58)]">
          <div
            onClick={closeFilterModel}
            className="fixed top-4 right-4 hover:cursor-pointer"
          >
            <ImCross />
          </div>
          <div className="z-10">
            <FilterModel
              applyFilter={applyFilter}
              clearAllFilters={clearAllFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
