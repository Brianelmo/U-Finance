import { useState } from "react";
import axios from "axios";
import FormLogin from "./FormLogin";
import { IconX } from "@tabler/icons-react";
import { useContext } from "react";
import { userContext } from "../Context/UserContext";
type Props = {
  func: () => void;
};

function RegisterModule({ func }: Props) {
  const [formadata, setFormadata] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [loged, setLoged] = useState(true);
  const context = useContext(userContext);
  const user = context?.user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormadata({
      ...formadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5432/api/register/registro",
        formadata
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    console.log(formadata);
  };

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-10 bg-opacity-50 z-10 backdrop-blur-sm ${
        user ? "invisible" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-10 bg-[#1F2937] w-[640px] h-[600px] py-5 px-20 rounded-md shadow-2xl">
        <div className="relative cursor-pointer" onClick={func}>
          <div className="absolute left-65 w-10 h-10 bg-[#111827] rounded-full hover:bg-[#364153] transition-colors ">
            <IconX color="white" size={40} />
          </div>
        </div>

        {loged ? (
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center justify-center gap-10 w-full"
          >
            <h4 className="text-3xl text-white font-bold">Register</h4>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-white text-xl font-bold" htmlFor="nombre">
                User
              </label>
              <input
                className="bg-[#374151] px-2 py-1 rounded-lg outline-none text-gray-400 shadow-2xl"
                type="text"
                name="nombre"
                id=""
                value={formadata.nombre}
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-white text-xl font-bold" htmlFor="email">
                Email
              </label>
              <input
                className="bg-[#374151] px-2 py-1 rounded-lg outline-none text-gray-400 shadow-2xl"
                type="email"
                name="email"
                id=""
                value={formadata.email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-white font-bold text-xl"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-[#374151] px-2 py-1 rounded-lg outline-none text-gray-500 shadow-2xl"
                type="password"
                name="password"
                id=""
                required
                value={formadata.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-[#518BB8] py-2 px-10 rounded-lg text-white font-bold cursor-pointer hover:bg-[#51A2FF] transition-colors"
            >
              Submit
            </button>
            <p
              onClick={() => setLoged(false)}
              className="text-white font-bold cursor-pointer"
            >
              do you already have an account? click here
            </p>
          </form>
        ) : (
          <FormLogin />
        )}
      </div>
    </div>
  );
}
export default RegisterModule;
