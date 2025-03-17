import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../Context/UserContext";

interface IncomeProps {
  func: (newIncome: incomUser) => void;
}

function IncomeForm({func}:IncomeProps) {
  const [CreateIncome, setCreateIncome] = useState({
    motivoEntrada: "",
    usuarioId: 0,
    entradaNum: 0,
  });

  const context = useContext(userContext);
  const user = context?.user;

  useEffect(() => {
    if (user) {
      setCreateIncome((prevIncome) => ({
        ...prevIncome,
        usuarioId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateIncome((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  };

  const incomeToSend = {
    ...CreateIncome,
    entradaNum: parseFloat(CreateIncome.entradaNum.toString()),
  };

  const handleIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5432/api/incomes/createincome",
        incomeToSend
      );
      console.log(response.data);
      console.log(incomeToSend);
      console.log(CreateIncome);
      func({
        ...incomeToSend,
        id:response.data.id,
        fechaEntrada:response.data.fechaEntrada
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col bg-[#1F2937] rounded-lg p-10 text-white gap-10 col-span-3 row-span-3 max-h-[383px]">
      <h3 className="text-2xl font-bold text-[#4CAF50]">Add Income</h3>
      <form onSubmit={handleIncome} className="flex flex-col gap-10" action="">
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="motiovoEntrada">
            Source
          </label>
          <input
            className="bg-[#374151] py-1 px-2 rounded-md outline-none"
            type="text"
            placeholder="e.g, Salary"
            onChange={handleChange}
            value={CreateIncome.motivoEntrada}
            name="motivoEntrada"
            id="motivoEntrada"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="entradaNum">
            Amount
          </label>
          <input
            className="bg-[#374151] py-1 px-2 rounded-md outline-none"
            type="number"
            placeholder="0.00"
            onChange={handleChange}
            value={CreateIncome.entradaNum}
            name="entradaNum"
            id="entradaNum"
          />
        </div>
        <button
          type="submit"
          className="bg-[#4CAF50] rounded-lg p-2 cursor-pointer"
        >
          Add Income
        </button>
      </form>
    </section>
  );
}

export default IncomeForm;
