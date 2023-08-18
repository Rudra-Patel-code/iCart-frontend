import React, { useState } from "react";
import Header from "../../Layout/Header";
import Status from "./Status";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../redux/store";
import { FaSpinner } from "react-icons/fa";

const ConfirmOrder = () => {
  const { user, shippingInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);

  const getTotalPrice = () => {
    let totalAmount = 0;
    for (let item of cart) {
      totalAmount += item.product.price * item.quantity;
    }

    return totalAmount;
  };

  const shippingCharges = getTotalPrice() > 2000 ? 0 : 200;

  const proceedToPay = async (e) => {
    setLoading(true);

    e.preventDefault();
    const orderInfo = {
      totalPrice: getTotalPrice() + shippingCharges,
      cart,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    const { data: key } = await axios.get(`${server}/order/getkey`, {
      withCredentials: true,
    });

    const {
      data: { order },
    } = await axios.post(
      `${server}/order/checkout/instance`,
      { totalPrice: orderInfo.totalPrice },
      { withCredentials: true }
    );

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "iCart - Ecommerce Store",
      description: "Test Payment Prcess for iCart Store",
      image:
        "https://res.cloudinary.com/di2nyulhu/image/upload/v1691672779/logo_wasexn.jpg",
      order_id: order.id,
      callback_url: `${server}/order/verify/payment`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.shippingInfo.phoneNo,
      },

      theme: {
        color: "#800080",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();

    setLoading(false);
  };

  return (
    <>
      <Header isSearchBar={false} />
      <Status step={2} />

      <div className="flex flex-col items-center justify-center p-4 font-mono">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <p className="font-light">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="font-light">
              <span className="font-semibold">Phone:</span>{" "}
              {shippingInfo.phoneNo}
            </p>
            <p className="font-light">
              <span className="font-semibold">Address:</span>{" "}
              {shippingInfo.address}
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-lg font-semibold mb-2">Cart Items</h2>
            <div className="flex flex-col gap-2 w-full">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                >
                  <img
                    className="object-cover w-20 h-20 mr-4 rounded-full"
                    src={item.product.image.url}
                    alt={item.product.title}
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {item.product.title}
                    </h3>

                    <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                      ₹ {item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <p>Subtotal: ₹{getTotalPrice()}</p>
            <p>Shipping Charges: ₹{shippingCharges}</p>
            <p>
              Total Amount:{" "}
              {`₹${getTotalPrice()} + ₹${shippingCharges} = ₹${
                getTotalPrice() + shippingCharges
              }`}
            </p>
          </div>
          <button
            onClick={proceedToPay}
            disabled={loading ? true : false}
            className="bg-purple-700 hover:bg-purple-900 text-white  py-2 px-4 rounded-md"
          >
            {loading ? (
              <>
                <div className="flex justify-center items-center gap-2">
                  Preparing
                  <FaSpinner className="animate-spin text-xl" />
                </div>
              </>
            ) : (
              <div>Proceed to Pay</div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
