import { useDispatch, useSelector } from "react-redux";
import CartItem from "./Components/CartItem";
import Header from "../../Layout/Header";
import { deleteItem, loadCart } from "../../redux/actions/cartaction";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart: cartItems,
    cartLoading,
    deleteLoading,
    deletignItemId,
    error,
    message,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTotalPrice = () => {
    let totalAmount = 0;
    for (let item of cartItems) {
      totalAmount += item.product.price * item.quantity;
    }

    return totalAmount;
  };

  const proceedToCheckout = () => {
    navigate("/shipping");
  };

  const deleteCartItem = (id) => {
    dispatch(deleteItem(id));
  };

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

  useEffect(() => {
    dispatch(loadCart());
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Your Cart</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cartLoading ? (
              <>
                <h1>Loading Items</h1>
              </>
            ) : (
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    deleteLoading={deleteLoading}
                    deletignItemId={deletignItemId}
                    deleteCartItem={deleteCartItem}
                  />
                ))}
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg mt-8">
            <p className="text-2xl font-medium text-gray-700">
              Total: ${getTotalPrice()}
            </p>

            <button
              onClick={proceedToCheckout}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 mt-4"
              disabled={cartLoading || cartItems.length === 0 ? true : false}
            >
              Proceed to checkout
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
