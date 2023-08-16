import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import {
  updateProduct,
  updateProductImage,
} from "../../../redux/actions/productAction";

const EditProductModel = ({ product }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(product?.title || "CONN-Error");
  const [description, setDescription] = useState(
    product?.description || "CONN-Error"
  );
  const [price, setPrice] = useState(product?.price || "CONN-Error");
  const [category, setCategory] = useState(product?.category || "CONN-Error");
  const [stock, setStock] = useState(product?.stock || "CONN-Error");

  const { loading, categories } = useSelector((state) => state.utils);

  const { productloading, imageUpdateLoading } = useSelector(
    (state) => state.product
  );

  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (image) {
      const myData = new FormData();
      myData.append("file", image);
      dispatch(updateProductImage(myData, product._id));
    }

    dispatch(
      updateProduct({ title, description, price, stock, category }, product._id)
    );
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <>
      <div className=" rounded-md border-2 border-slate-500 shadow-xl bg-white  p-5 flex flex-col gap-8 overflow-auto">
        <h1 className="font-bold font-mono text-base">Update Product</h1>

        <form
          className="flex-col justify-center items-center w-full"
          onSubmit={submit}
        >
          <div className="flex items-center justify-center my-4 ">
            <input
              type="text"
              className="border-b-2 w-full  bg-none border-black md:px-2 p-[4px] text-xs md:text-sm focus:outline-none focus:border-purple-500"
              required
              placeholder="Product Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center my-4 justify-center ">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              className="border-2 w-full rounded-md bg-none border-black md:px-2 p-[8px] text-xs md:text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center my-4 justify-center ">
            <BsCurrencyRupee className="text-xl" />
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price"
              className="border-b-2 w-full  bg-none border-black md:px-2 p-[4px] text-xs md:text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2 my-4">
            {loading ? (
              <>
                <div className="flex-1 flex justify-center">
                  <FaSpinner className="animate-spin" />
                </div>
              </>
            ) : (
              <>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  name="Category"
                  id="category"
                  required
                  className="border-2 overflow-auto flex-[1] py-1 px-2 rounded-md border-purple-600 focus:outline-none text-[12px] md:text-sm "
                >
                  {categories?.map((cate) => (
                    <option
                      value={cate.identifier}
                      key={cate.identifier}
                      className="hover:bg-purple-600 focus:bg-purple-600 py-4"
                    >
                      {cate.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <input
              type="number"
              value={stock}
              required
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="border-b-2 bg-none border-black md:px-2 p-[4px] text-xs md:text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="my-4">
            <label className="block">
              <input
                type="file"
                // required
                onChange={changeImageHandler}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          </div>
          <div className="mb-4">
            <img
              src={!imagePrev ? product?.image?.url : imagePrev}
              className="max-w-none m-auto w-40"
            />
          </div>

          <button
            className="bg-purple-500 font-sans cursor-pointer rounded-lg px-5 py-2 ml-[50%] translate-x-[-50%] text-white"
            type="submit"
            disabled={productloading || imageUpdateLoading ? true : false}
          >
            {productloading || imageUpdateLoading ? (
              <>
                <FaSpinner className="animate-spin" />
              </>
            ) : (
              <>Update</>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProductModel;
