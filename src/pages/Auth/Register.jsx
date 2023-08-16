import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import ToHome from "../../utils/ToHome";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";

const Register = () => {
  const [isPass, setIsPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { loading, message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPass));
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
  }, [dispatch, error, message]);

  return (
    <>
      <ToHome />
      <div className="flex justify-center  w-full h-[100vh] border">
        <div className="flex-col justify-center items-center">
          <h1 className="mb-5 mt-40 text-xl text-center ">
            Welcome To <span className="text-purple-700">iCart</span> <br />
          </h1>

          <div>
            <form
              className="flex-col justify-center items-center w-full"
              onSubmit={handleLoginSubmit}
            >
              <div className="flex items-center mx-[-8px] mb-3">
                <BsFillPersonFill className="text-base md:text-xl mx-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b-2 border-black md:px-2 py-[4px] text-sm md:text-base focus:outline-none focus:border-purple-500"
                  required
                  placeholder="Full Name"
                />
              </div>
              <div className="flex items-center mx-[-8px] mb-3">
                <MdEmail className="text-base md:text-xl mx-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b-2 border-black md:px-2 py-[4px] text-sm md:text-base focus:outline-none focus:border-purple-500"
                  required
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center mx-[-8px] mb-3">
                <RiLockPasswordFill className="text-base md:text-xl mx-2" />
                <input
                  type={isPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-b-2 text-sm md:text-base relative border-black px-2 py-[4px] focus:outline-none focus:border-purple-500"
                  required
                  placeholder="Password"
                />
                {!isPass ? (
                  <AiFillEye
                    className=" text-xl md:text-2xl mx-1 cursor-pointer"
                    onClick={() => setIsPass(!isPass)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className=" text-xl md:text-2xl mx-1 cursor-pointer"
                    onClick={() => setIsPass(!isPass)}
                  />
                )}
              </div>
              <div className="flex items-center mx-[-8px] mb-3">
                <RiLockPasswordFill className="text-base md:text-xl mx-2" />
                <input
                  type={isPass ? "text" : "password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="border-b-2 text-sm md:text-base relative border-black px-2 py-[4px] focus:outline-none focus:border-purple-500"
                  required
                  placeholder="Confirm Password"
                />
                {!isPass ? (
                  <AiFillEye
                    className=" text-xl md:text-2xl mx-1 cursor-pointer"
                    onClick={() => setIsPass(!isPass)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className=" text-xl md:text-2xl mx-1 cursor-pointer"
                    onClick={() => setIsPass(!isPass)}
                  />
                )}
              </div>
              <button
                className="bg-purple-500 flex items-center gap-3 font-sans cursor-pointer rounded-lg px-5 py-2 ml-[50%] translate-x-[-50%] text-white"
                type="submit"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Registering
                  </>
                ) : (
                  <>Register</>
                )}
              </button>
            </form>
          </div>

          <div className="flex items-center mt-5 ">
            <div className="flex-1 border border-slate-400 h-[0]"></div>
            <p className="mx-3">or</p>
            <div className="flex-1 border border-slate-400 h-[0]"></div>
          </div>

          <p className="text-sm font-sans">
            Already have an Account ?{" "}
            <Link to={"/login"} className="text-purple-500 cursor-pointer">
              Login{" "}
            </Link>{" "}
            Here.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
