import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoBack = ({ to }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="text-3xl fixed top-20 hover:cursor-pointer  left-9"
    >
      <FaArrowLeft className="z-[-10]" />
    </div>
  );
};

export default GoBack;
