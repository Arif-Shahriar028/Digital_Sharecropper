import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, password, type });
  };
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[70%] flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-y-6"
          >
            <div className="w-full flex justify-center items-center">
              <span className="text-3xl font-bold text-[#42A045]">Signup</span>
            </div>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className=" p-4 w-[80%] text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
            />
            <input
              type="number"
              placeholder="Phone number"
              value={phone}
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
            <select
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              value={type}
              onChange={(e) => setType(e.target.value)}
              className=" p-4 w-[80%] outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
            >
              <option value="">Select user type</option>
              <option value="Farmer">Farmer</option>
              <option value="Landowner">Landowner</option>
              <option value="Investor">Investor</option>
            </select>
            <div className="">
              <p className="text-md text-black">
                Have already an account? Go for
                <Link to="/signin" className="text-[#42A045] ml-2">
                  Signin
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-white px-8 py-3 bg-[#42A045]"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="w-full flex justify-start">
            <img src="/img/sign_up.gif" alt="" className="h-[60vh]" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
