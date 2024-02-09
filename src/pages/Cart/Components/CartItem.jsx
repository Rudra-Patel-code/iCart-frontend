import { AiOutlineDelete } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

const CartItem = ({ item, deleteCartItem, deleteLoading, deletignItemId }) => {
  const { title: name, totalRatings, price, image } = item?.product;
  const quantity = item?.quantity;

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <img
        className="object-cover w-20 h-20 mr-4 rounded-full"
        src={image.url}
        alt={name}
      />
      <div className="flex flex-col justify-between flex-1">
        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          {name}
        </h3>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
          {totalRatings} / 5 stars
        </p>
        <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
          ₹ {price}
        </p>
      </div>

      <button
        className="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300"
        onClick={() => deleteCartItem(item._id)}
      >
        {deleteLoading && item._id === deletignItemId ? (
          <>
            <FaSpinner className="animate-spin" />
          </>
        ) : (
          <>
            <AiOutlineDelete size={24} />
          </>
        )}
      </button>
    </div>
  );
};

export default CartItem;
