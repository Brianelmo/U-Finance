import React, { useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../Context/UserContext";

function FormLogin() {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  
  const [view, setView] = useState(true);

  const userContextValue = useContext(userContext);
  if (!userContextValue) {
    throw new Error("userContextValue is undefined");
  }
  const { setUser } = userContextValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5432/api/login/userlogin",
        formData
      );
      console.log(response.data.Valido);
      setUser(response.data.Valido);
      if(response.data){
        setView(false);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };

  return (
    <div className="w-full">
      {view ? (
        <form
        className="flex flex-col items-center justify-center gap-10 w-full"
        onSubmit={handleLogin}
        action=""
      >
        <h4 className="text-3xl text-white font-bold">Log in</h4>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white text-xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="bg-[#374151] px-2 py-1 rounded-lg outline-none text-gray-400 shadow-2xl"
            type="email"
            name="email"
            id=""
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white text-xl font-bold" htmlFor="password">
            password
          </label>
          <input
            className="bg-[#374151] px-2 py-1 rounded-lg outline-none text-gray-400 shadow-2xl"
            type="password"
            name="password"
            id=""
            value={formData.password}
            required
            onChange={handleChange}
          />
        </div>
        <button className="bg-[#518BB8] py-2 px-10 rounded-lg text-white font-bold cursor-pointer hover:bg-[#51A2FF] transition-colors">
          Sign In
        </button>
      </form>
      ): ''}
    </div>
  );
}

export default FormLogin;
