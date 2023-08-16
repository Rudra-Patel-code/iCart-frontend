import { useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/utilsAction";
import { toast } from "react-hot-toast";
import { createProduct } from "../../../redux/actions/productAction";

const CreateProductModel = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Category");
  const [stock, setStock] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.utils);
  const { productloading, message, error } = useSelector(
    (state) => state.product
  );

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submit = (e) => {
    e.preventDefault();
    const myData = new FormData();
    myData.append("title", title);
    myData.append("description", description);
    myData.append("price", price);
    myData.append("category", category);
    myData.append("stock", stock);
    myData.append("file", image);

    dispatch(createProduct(myData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      setTitle("");
      setPrice("");
      setImage("");
      setImagePrev("");
      setStock("");
      setDescription("");
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <div className=" rounded-md border-2 border-slate-500 shadow-xl bg-white  p-5 flex flex-col gap-8 overflow-auto max-w-[98vw]">
        <div className="font-bold font-mono text-base">New Product Details</div>

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
                  className="border-2 overflow-auto flex-[1] py-1 px-2 rounded-md border-purple-600 focus:outline-none text-[12px] md:text-sm max-w-[50%] "
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
              className="border-b-2 bg-none border-black md:px-2 p-[4px] text-xs md:text-sm focus:outline-none focus:border-purple-500 "
            />
          </div>

          <div className="my-4">
            <label className="block">
              <input
                type="file"
                required
                onChange={changeImageHandler}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          </div>

          {imagePrev && (
            <>
              <div className="mb-4">
                <img src={imagePrev} className="max-w-none m-auto w-40" />
              </div>
            </>
          )}
          <button
            className="bg-purple-500 font-sans cursor-pointer rounded-lg px-5 py-2 ml-[50%] translate-x-[-50%] text-white"
            type="submit"
            disabled={productloading ? true : false}
          >
            {productloading ? (
              <>
                <FaSpinner className="animate-spin" />
              </>
            ) : (
              <>Create</>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProductModel;
