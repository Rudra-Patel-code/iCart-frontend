import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdAccountBalance, MdLibraryAddCheck } from "react-icons/md";

const divClass = "text-xl md:text-2xl transition-all";
const pClass = "text-xs md:text-sm text-center transition-all";

const Status = ({ step }) => {
  const one = step === 1 || step === 2 || step === 3;
  const two = step === 2 || step === 3;
  const three = step === 3;

  return (
    <div className="my-5 w-[100%] flex justify-center items-center">
      <div className={`flex flex-col items-center `}>
        <FaShippingFast
          className={`${divClass} ${
            one ? "text-purple-700 " : "text-slate-600"
          } `}
        />
        <p
          className={` ${pClass} ${
            one ? "text-purple-700" : "text-slate-600"
          } `}
        >
          Shipping Details
        </p>
      </div>

      <div
        className={`w-[27%] border transition-all ${
          two ? "border-purple-700" : ""
        } `}
      ></div>

      <div className={`flex flex-col items-center `}>
        <MdLibraryAddCheck
          className={`${divClass} ${
            two ? "text-purple-700 " : "text-slate-600"
          }`}
        />
        <p
          className={`${pClass} ${two ? "text-purple-700" : "text-slate-600"} `}
        >
          Confirm Order
        </p>
      </div>

      <div
        className={`w-[27%] border transition-all ${
          three ? "border-purple-700" : ""
        } `}
      ></div>

      <div className={`flex flex-col items-center `}>
        <MdAccountBalance
          className={`${divClass} ${
            three ? "text-purple-700 " : "text-slate-600"
          }`}
        />
        <p
          className={`${pClass} ${
            three ? "text-purple-700" : "text-slate-600"
          } `}
        >
          Success
        </p>
      </div>
    </div>
  );
};

export default Status;
