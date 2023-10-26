import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../Api/api";
import Loader from "../components/Loader";

const Signin = () => {
  const navigate = useNavigate();
  const [phoneNo, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await userSignin({ phoneNo, password });
    if (res.status === 200) {
      setLoading(false);
      const { Key, Nid, Type, Name } = res.data;
      localStorage.setItem("key", Key);
      localStorage.setItem("Nid", Nid);
      localStorage.setItem("Type", Type);
      localStorage.setItem("name", Name);
      navigate("/");
    }
  };
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[70%] flex justify-center items-center mt-20">
          <div className="w-full flex justify-end">
            <img src="/img/signin.gif" alt="" className="h-[60vh]" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-y-6"
          >
            <div className="w-full flex justify-center items-center">
              <span className="text-2xl font-bold text-[#42A045]">Login</span>
            </div>
            <input
              type="text"
              placeholder="Phone number"
              value={phoneNo}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className=" p-4 w-[80%] text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className=" p-4 w-[80%] text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
            />

            <div className="">
              <p className="text-md text-black">
                Do not have any account? Go for
                <Link to="/signup" className="text-[#42A045] ml-1">
                  Signup
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center">
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className="text-[#F4F4F5] px-8 py-3 bg-[#42A045]"
                >
                  Signin
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin;
