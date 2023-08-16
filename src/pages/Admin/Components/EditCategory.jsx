import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  getCategories,
  updateCategory,
} from "../../../redux/actions/utilsAction";

const EditCategory = ({ category }) => {
  const { updateLoading, message, error } = useSelector((state) => state.utils);

  const [name, setName] = useState(category.name || "CONN_ERR");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  const updateSubmit = async (e) => {
    e.preventDefault();
    console.log(category._id, name);
    await dispatch(updateCategory(category._id, name));
    dispatch(getCategories());
  };

  return (
    <form
      onSubmit={updateSubmit}
      className="flex items-center justify-center text-sm gap-2 "
    >
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border-2 border-purple-700 p-2 rounded-xl "
      />
      <button
        type="submit"
        className="p-2 rounded-lg bg-purple-700 text-white"
        disabled={updateLoading ? true : false}
      >
        {updateLoading ? (
          <>
            <FaSpinner className="animate-spin" />
          </>
        ) : (
          <>Update</>
        )}
      </button>
    </form>
  );
};

export default EditCategory;
