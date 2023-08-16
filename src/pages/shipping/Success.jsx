import React, { useEffect } from "react";
import Status from "./Status";
import Header from "../../Layout/Header";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/utilsAction";
import { loadData } from "../../redux/actions/authActions";

const Success = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const { isCreatingOrder } = useSelector((state) => state.utils);
  const { loading, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");
  const payId = query.get("payId");

  useEffect(() => {
    if (orderInfo) {
      dispatch(createOrder(orderInfo, payId));
    }
  }, []);

  return (
    <>
      <Header isSearchBar={false} />
      <Status step={3} />

      <div className="flex items-center justify-center mt-28">
        {isCreatingOrder || loading ? (
          <div className="flex flex-col items-center">
            <ImSpinner2 className="text-6xl animate-spin text-purple-700" />
            <h1 className="mt-4 text-3xl font-bold  ">Creating Order</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-6xl text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-green-500">
              Order Successful!
            </h1>
            <p>Refrence-No: {ref}</p>

            <button
              onClick={() => navigate("/")}
              className="my-10 bg-purple-700 hover:bg-purple-800 rounded-lg text-white p-3"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Success;
