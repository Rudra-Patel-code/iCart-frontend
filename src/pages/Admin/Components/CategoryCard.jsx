import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CategoryCard = ({
  name,
  id,
  deleteLoading,
  deleteCategory,
  openEditModel,
}) => {
  return (
    <div className="border m-auto text-xs p-2 min-w-[250px] max-w-[250px] sm:max-w-none sm:min-w-[500px] flex gap-2">
      <div className="flex-1">
        <h1 className="w-[70%] text-xs sm:text-xs">{name}</h1>
      </div>

      <div className="flex text-xl ">
        <button
          onClick={() => openEditModel(id, name)}
          className="flex items-center gap-1 outline-none hover:cursor-pointer py-2 px-3 text-purple-600"
        >
          <BiEdit />
          <span className="text-xs hidden sm:block">Edit</span>
        </button>
        <button
          onClick={() => deleteCategory(id)}
          disabled={deleteLoading ? true : false}
          className="flex items-center gap-1 outline-none  hover:cursor-pointer pointer-events-auto py-2 px-3 text-red-500"
        >
          {deleteLoading ? (
            <>
              <FaSpinner className="animate-spin mx-auto text-xl" />
            </>
          ) : (
            <>
              <AiOutlineDelete />
              <span className="text-xs hidden sm:block">Delete</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
