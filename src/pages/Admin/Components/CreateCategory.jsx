import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import {
  createCategory,
  deleteCategory as delete_categories,
  getCategories,
  getOneCategory,
} from "../../../redux/actions/utilsAction";
import { toast } from "react-hot-toast";
import { ImCross } from "react-icons/im";
import EditCategory from "./EditCategory";

const CreateCategory = () => {
  const [text, setText] = useState("");
  const {
    loading,
    categories,
    deleteLoading,
    createLoading,
    oneCategory,
    oneCategoryLoading,
    message,
    error,
  } = useSelector((state) => state.utils);
  const dispatch = useDispatch();

  const [editModel, setEditModel] = useState(false);

  const closeEditModel = () => setEditModel(false);

  const openEditModel = (id) => {
    setEditModel(true);
    dispatch(getOneCategory(id));
  };
  const deleteCategory = async (id) => {
    await dispatch(delete_categories(id));
    console.log("deleted successfully");
    dispatch(getCategories());
  };

  useEffect(() => {
    console.log("use effect getCtegories");
    dispatch(getCategories());
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

  const createSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCategory(text));
    dispatch(getCategories());
  };

  return (
    <>
      <div className="flex items-center justify-center text-sm gap-2 mt-10 ">
        <form
          onSubmit={createSubmit}
          className="flex items-center justify-center text-sm gap-2 "
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Category"
            className="border-2 border-purple-700 p-2 rounded-xl "
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-purple-700 text-white"
            disabled={createLoading ? true : false}
          >
            {createLoading ? (
              <>
                <FaSpinner className="animate-spin" />
              </>
            ) : (
              <>Create</>
            )}
          </button>
        </form>
      </div>
      <div className="border border-slate-500 w-[50%] md:w-[35%] lg:w-[20%] mx-auto my-3"></div>

      {loading ? (
        <div className=" flex mt-10 gap-2 flex-col text-slate-500 items-center justify-center  text-2xl">
          <FaSpinner className="animate-spin" />
          <p className="text-xl">Loading Categories</p>
        </div>
      ) : (
        <>
          <div className="flex gap-1 flex-col items-start">
            {categories?.map((category) => (
              <CategoryCard
                key={category._id}
                name={category.name}
                id={category._id}
                deleteLoading={deleteLoading}
                deleteCategory={deleteCategory}
                openEditModel={openEditModel}
              />
            ))}
          </div>
        </>
      )}

      {/* Edit Model */}

      <div className={`${editModel ? "visible" : "hidden"}`}>
        <div className="fixed bg top-0 left-0 backdrop-blur-[2px] w-[100%] h-[100%] overflow-auto flex justify-center items-center bg-[rgba(193,193,193,0.58)]">
          <div
            onClick={closeEditModel}
            className="fixed top-4 right-4 hover:cursor-pointer"
          >
            <ImCross />
          </div>

          {oneCategoryLoading || !oneCategory ? (
            <>
              <div className="animate-spin text-2xl">
                <FaSpinner />
              </div>
            </>
          ) : (
            <div className="z-10">
              <EditCategory category={oneCategory} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
