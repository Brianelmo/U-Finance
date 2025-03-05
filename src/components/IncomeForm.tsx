import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../Context/UserContext";

function IncomeForm() {
  const [CreateIncome, setCreateIncome] = useState({
    motivoIngreso: "",
    usuarioId: 0,
    ingresoNum: 0,
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
    ingresoNum: parseFloat(CreateIncome.ingresoNum.toString()),
  };

  const handleIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/incomes/createincome",
        incomeToSend
      );
      console.log(response.data);
      console.log(incomeToSend);
      console.log(CreateIncome);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col bg-[#1F2937] rounded-lg p-10 text-white gap-10 col-span-3 row-span-3 max-h-[383px]">
      <h3 className="text-2xl font-bold text-[#4CAF50]">Add Income</h3>
      <form onSubmit={handleIncome} className="flex flex-col gap-10" action="">
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="motivoIngreso">
            Source
          </label>
          <input
            className="bg-[#374151] py-1 px-2 rounded-md outline-none"
            type="text"
            placeholder="e.g, Salary"
            onChange={handleChange}
            value={CreateIncome.motivoIngreso}
            name="motivoIngreso"
            id="motivoIngreso"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="ingresoNum">
            Amount
          </label>
          <input
            className="bg-[#374151] py-1 px-2 rounded-md outline-none"
            type="number"
            placeholder="0.00"
            onChange={handleChange}
            value={CreateIncome.ingresoNum}
            name="ingresoNum"
            id="ingresoNum"
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
