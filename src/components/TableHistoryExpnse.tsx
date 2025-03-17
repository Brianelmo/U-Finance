import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { ExpenseUser } from "../types";
import { deleteExpense, editExpense } from "../Api/ExpenseApi";
import React, { useState } from "react";

interface Props {
  dataUser: ExpenseUser[];
  onDelete: (id: number) => void;
  onEdit: (updatedExpense: ExpenseUser) => void;
}

function TableHistoryExpense({ dataUser, onDelete, onEdit }: Props) {
  const [showInput, setShowInput] = useState(false);
  const [expenseEdit, setExpenseEdit] = useState({
    id: 0,
    gastoNum: 0,
    motivoGasto: "",
    fechaGasto: "",
    usuarioId: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseEdit((prevExpenses) => ({
      ...prevExpenses,
      [name]: name === "gastoNum" ? parseFloat(value): value,
    }));
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      onDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (expense: ExpenseUser) => {
    setExpenseEdit(expense);
    setShowInput(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updateExpense = await editExpense(expenseEdit)
      onEdit(updateExpense);
      console.log(expenseEdit)
      setShowInput(false);
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} action="">
        <table className="min-w-full text-white rounded-lg p-4 overflow-x-hidden overflow-y-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left font-bold">Category</th>
              <th className="py-2 px-4 border-b text-left font-bold">Amount</th>
              <th className="py-2 px-4 border-b text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((data) => (
              <tr className="" key={data.id}>
                <td className="py-2 px-4 text-left hover:bg-[#27272A] transition-colors">
                  {showInput && expenseEdit.id === data.id ? (
                    <input
                      className="outline-none py-2 px-4 w-full"
                      type="text"
                      placeholder="Ingrese el nuevo motivo"
                      onChange={handleChange}
                      name="motivoGasto"
                      value={expenseEdit.motivoGasto}
                    />
                  ) : (
                    data.motivoGasto
                  )}
                </td>
                <td className="py-2 px-4 text-left hover:bg-[#27272A] transition-colors">
                  {showInput && expenseEdit.id === data.id ? (
                    <input
                      className="py-2 px-4 outline-none w-full"
                      type="number"
                      placeholder="Ingrese el nuevo monto"
                      onChange={handleChange}
                      name="gastoNum"
                      value={expenseEdit.gastoNum}
                    />
                  ) : (
                    data.gastoNum
                  )}
                </td>
                <td className="py-2 px-4 text-left cursor-pointer">
                  <div className="flex gap-4">
                    <IconTrash color="red" onClick={() => handleDelete(data.id)} />
                    {showInput && expenseEdit.id === data.id ? (
                      <span onClick={() => setShowInput(false)}>Cancel</span>
                    ) : (
                      <IconPencil onClick={() => handleEdit(data)} />
                    )}
                    {showInput && expenseEdit.id === data.id && (
                      <button type="submit" className="cursor-pointer font-bold">
                        Save Changes
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default TableHistoryExpense;
