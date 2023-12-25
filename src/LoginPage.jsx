import React, { useState } from 'react';


const LoginForm = ({ onLogin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(email)
  };
  return (
    <div className="flex flex-col items-center justify-center  bg-black text-white border-2 border-yellow-500 w-1/2 h-1/2">
      <h1 className="text-2xl text-yellow-500 font-bold mb-4">Hubbei</h1>
      <div className="mb-4 flex items-center border-2 border-white-500 w-[80%] h-[15%]">
        <label className="mr-4 px-2">
          <h6>Email*</h6>
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-black text-white border-none focus:outline-none"
        />
      </div>
      <div className="mb-4 flex items-center border-2 border-white-500 w-[80%] h-[15%]">
        <label className="mr-4 px-2">
          <h6>Password*</h6>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-black text-white border-none  focus:outline-none"
        />
      </div>
      <div className="mt-2 ml-[75%]">
        <h5>forgotten password</h5>
        <button onClick={handleLogin} className="bg-yellow-500 text-black font-medium py-2 px-4 rounded w-[80%]">Login</button>
      </div>

    </div>

  );
};

export default LoginForm;