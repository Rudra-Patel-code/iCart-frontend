import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import Status from "./Status";
import { toast } from "react-hot-toast";
import { FaAddressCard, FaChessPawn, FaCity, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";

import { MdPinDrop, MdPublic, MdTransferWithinAStation } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiReaperScythe } from "react-icons/gi";
import { addShippingInfo } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const repeatingStyles = {
  div: "flex gap-2 justify-center items-center",
  icon: "text-slate-800 text-xl translate-y-[20%]",
  input:
    "outline-none px-3 py-2 text-sm border-b-2 focus:border-b-purple-700 border-b-slate-800",
};

const Shipping = () => {
  const { user, message, isaddingShippingInfo, error } = useSelector(
    (state) => state.auth
  );

  const shippingInfo = user.shippingInfo;

  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetails = async (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10)
      return toast.error("Please Enter a valid Phone Number");
    if (pinCode.length < 7 || pinCode.length > 10)
      return toast.error("Please Enter a valid Pincode");

    await dispatch(
      addShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    if (!error) navigate("/shipping/confirm");
  };

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

  return (
    <>
      <Header isSearchBar={false} />
      <Status step={1} />
      <div className="flex flex-col w-full items-center">
        <h2 className="text-xl my-5">Shipping Details</h2>

        <form onSubmit={handleDetails} className="flex flex-col gap-2">
          <div className={repeatingStyles.div}>
            <FaAddressCard
              className={`${repeatingStyles.icon} translate-y-[20%]`}
            />
            <input
              type="text"
              placeholder="Enter Full Address"
              required
              className={repeatingStyles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={repeatingStyles.div}>
            <FaCity className={repeatingStyles.icon} />
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              className={repeatingStyles.input}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className={repeatingStyles.div}>
            <MdPinDrop className={repeatingStyles.icon} />
            <input
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              className={repeatingStyles.input}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className={repeatingStyles.div}>
            <BsFillTelephoneFill className={repeatingStyles.icon} />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              className={repeatingStyles.input}
              onChange={(e) => setPhoneNo(e.target.value)}
              size={10}
            />
          </div>

          <div className={`${repeatingStyles.div} my-2 `}>
            <MdPublic className={repeatingStyles.icon} />

            <select
              required
              value={country}
              className="outline-none border-slate-700 border-2 focus:border-purple-700 w-[62%] rounded-md py-2 px-3 text-sm "
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option
                    className="rounded-lg"
                    key={item.isoCode}
                    value={item.isoCode}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div className={repeatingStyles.div}>
              <MdTransferWithinAStation className={repeatingStyles.icon} />

              <select
                required
                value={state}
                className="outline-none border-slate-700 border-2 focus:border-purple-700 w-[62%] rounded-md py-2 px-3 text-sm "
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option
                      className="rounded-lg"
                      key={item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isaddingShippingInfo ? true : false}
            className="px-3 mx-auto py-2 text-white bg-purple-700 mt-5 w-[70%]"
          >
            {isaddingShippingInfo ? (
              <>
                <div className="flex justify-center items-center gap-2">
                  Saving Info
                  <FaSpinner className="animate-spin text-xl" />
                </div>
              </>
            ) : (
              <>Continue</>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
