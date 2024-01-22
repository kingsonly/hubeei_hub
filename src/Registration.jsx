import React, { useState } from "react";

const RegistrationForm = ({ onRegister, onToggleForm }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
          const response = await axios.post("YOUR_SERVER_API_ENDPOINT", {
            name,
            email,
            password,
          });
    
          if (response.data && response.data.success) {
            onRegister(email);
          } else {
            console.error("Registration failed");
          }
        } catch (error) {
          console.error("Error during registration:", error);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center bg-black text-white border-2 border-yellow-500 lg:w-3/4 h-3/4">
            <h1 className="text-2xl text-yellow-500 font-bold mb-4">Hubbei</h1>
            <div className="mb-4 flex items-center border-2 border-white-500 w-[80%] h-[15%]">
                <label className="mr-4 px-2">
                    <h6>Name*</h6>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 bg-black text-white border-none focus:outline-none"
                />
            </div>
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
                <h5>Already have an account?</h5>
                <button onClick={onToggleForm} className="text-yellow-500">
                    Login
                </button>
            </div>
            <div className="mt-2 ml-[75%]">
                <button onClick={handleRegister} className="bg-yellow-500 text-black font-medium py-2 px-4 rounded w-[80%]">
                    Register
                </button>
            </div>
        </div>
    );
};

export default RegistrationForm