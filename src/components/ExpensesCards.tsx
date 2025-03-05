import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../Context/UserContext";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import IncomeForm from "./IncomeForm";

type ExpenseProp = {
  title: string;
};

interface expenseUser {
  fechaGasto: string;
  gastoNum: number;
  id: number;
  motivoGasto: string;
  usuarioId: number;
}

function ExpensesCards({ title }: ExpenseProp) {
  const [CreateExpenses, setCreateExpenses] = useState({
    motivoGasto: "",
    usuarioId: 0,
    gastoNum: 0,
  });

  const [expenses, setExpenses] = useState<expenseUser[]>([]);

  const context = useContext(userContext);
  const user = context?.user;

  useEffect(() => {
    if (user) {
      const getExpenses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/getexpenses/user/${user.id}`
          );
          console.log(response.data);
          setExpenses(response.data.gastos);
        } catch (error) {
          console.log(error);
        }
      };
      getExpenses();
      setCreateExpenses((prevExpenses) => ({
        ...prevExpenses,
        usuarioId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateExpenses((prevExpenses) => ({
      ...prevExpenses,
      [name]: value,
    }));
  };

  const expensesToSend = {
    ...CreateExpenses,
    gastoNum: parseFloat(CreateExpenses.gastoNum.toString()),
  };

  const handleExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "Expenses") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/expenses/expense",
          expensesToSend
        );
        console.log(response.data);
        console.log(CreateExpenses);
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          {
            ...expensesToSend,
            id: response.data.id,
            fechaGasto: response.data.fechaGasto,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="grid w-full grid-cols-6 grid-rows-2 gap-4">
      {title === "Expenses" ? (
        <section className="flex flex-col bg-[#1F2937] rounded-lg p-10 text-white gap-10 col-span-3 row-span-3 max-h-[383px]">
          <h3 className="text-2xl font-bold text-[#F44336]">Add Expense</h3>
          <form
            onSubmit={handleExpense}
            className="flex flex-col gap-10"
            action=""
          >
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="motivoGasto">
                Category
              </label>
              <input
                className="bg-[#374151] py-1 px-2 rounded-md outline-none"
                type="text"
                placeholder="e.g, Shopping"
                onChange={handleChange}
                value={CreateExpenses.motivoGasto}
                name="motivoGasto"
                id="motivoGasto"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="gastoNum">
                Amount
              </label>
              <input
                className="bg-[#374151] py-1 px-2 rounded-md outline-none"
                type="number"
                placeholder="0.00"
                onChange={handleChange}
                value={CreateExpenses.gastoNum}
                name="gastoNum"
                id="gastoNum"
              />
            </div>
            <button
              type="submit"
              className="bg-[#F44336] rounded-lg p-2 cursor-pointer"
            >
              Add Expense
            </button>
          </form>
        </section>
      ) : (
        <IncomeForm />
      )}
      <section className="flex flex-col bg-[#1F2937] rounded-lg p-10 text-white gap-10 col-span-3 row-span-3 max-h-[383px]">
        <h3
          className={`text-2xl font-bold ${
            title === "Income" && "text-[#4CAF50]"
          } ${title === "Expenses" && "text-[#F44336]"}`}
        >
          {title} Breakdown
        </h3>
        <div>
          <h2>Grafico</h2>
        </div>
      </section>
      <section className="col-span-6 row-span-2 bg-[#1F2937] rounded-lg p-10">
        <h3
          className={`text-2xl font-bold ${
            title === "Income" && "text-[#4CAF50]"
          } ${title === "Expenses" && "text-[#F44336]"}`}
        >
          {title} History
        </h3>
        <div className="">
          <table className="min-w-full text-white rounded-lg p-4 overflow-x-hidden overflow-y-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left font-bold">
                  Category
                </th>
                <th className="py-2 px-4 border-b  text-left font-bold">
                  Amount
                </th>
                <th className="py-2 px-4 border-b  text-left font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="py-2 px-4 text-left hover:bg-[#27272A] transition-colors">
                    {expense.motivoGasto}
                  </td>
                  <td className="py-2 px-4 text-left hover:bg-[#27272A] transition-colors">
                    {expense.gastoNum}
                  </td>
                  <div className="flex gap-4">
                    <td className="py-2 px-4 text-left cursor-pointer">
                      {<IconTrash color="red" />}
                    </td>
                    <td className="py-2 px-4 text-left cursor-pointer">
                      {<IconPencil />}
                    </td>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ExpensesCards;
