import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../Context/UserContext";
import IncomeForm from "./IncomeForm";
import TableHistoryExpense from "./TableHistoryExpnse";
import IncomeTable from "./IncomeTable";
import { ExpenseUser, IncomeUser } from "../types";

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
  const [incomes, setIncomes] = useState<IncomeUser[]>([]);

  const context = useContext(userContext);
  const user = context?.user;

  useEffect(() => {
    if (user) {
      const getExpenses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5432/api/getexpenses/user/${user.id}`
          );
          console.log(response.data);
          setExpenses(response.data.gastos);
        } catch (error) {
          console.log(error);
        }
      };
      const getIncomes = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5432/api/getincome/income/${user.id}`
          );
          console.log(response);
          setIncomes(response.data.incomes);
        } catch (error) {
          console.log(error);
        }
      };
      getIncomes();
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
          "http://localhost:5432/api/expenses/expense",
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

  const handleIncomeUpdate = (newIncome: IncomeUser) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes((preveIncome) =>
      preveIncome.filter((expense) => expense.id !== id)
    );
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const handleEditExpense = (updatedExpense: ExpenseUser) => {
    setExpenses((preveExpenses) =>
      preveExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
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
        <IncomeForm func={handleIncomeUpdate} />
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
        {title === "Expenses" ? (
          <TableHistoryExpense
            dataUser={expenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
        ) : (
          <IncomeTable data={incomes} onDelete={handleDeleteIncome} />
        )}
      </section>
    </div>
  );
}

export default ExpensesCards;
