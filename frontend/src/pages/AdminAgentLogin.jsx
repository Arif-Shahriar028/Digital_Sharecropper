import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAgentLogin } from '../Api/api';

const AdminAgentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await adminAgentLogin({ email, password });
    console.log(res.data);
    if (res.status === 200) {
      const { Key, Type, Name, Location } = res.data;
      localStorage.setItem('key', Key);
      localStorage.setItem('Type', Type);
      localStorage.setItem('name', Name);
      localStorage.setItem('location', Location);
      navigate('/');
    }
  };
  useEffect(() => {
    const key = localStorage.getItem('key');
    if (key) {
      navigate('/adminagentlogin');
    }
  }, []);
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[70%] flex justify-center items-center mt-20">
          <div className="w-full flex justify-end">
            <img src="/img/adminlogin.gif" alt="" className="h-[60vh]" />
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderTopLeftRadius: '25px',
                borderBottomRightRadius: '25px',
              }}
              className=" p-4 w-[80%] text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderTopLeftRadius: '25px',
                borderBottomRightRadius: '25px',
              }}
              className=" p-4 w-[80%] text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
            />
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-[#F4F4F5] px-8 py-3 bg-[#42A045]"
              >
                Signin
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminAgentLogin;
