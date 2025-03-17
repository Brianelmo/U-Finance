import { IconTrash, IconPencil } from "@tabler/icons-react";
import { IncomeUser } from "../types";
import { deleteIncome } from "../Api/IncomeApi";

interface Props {
    data:IncomeUser[]
    onDelete: (id:number) => void
}

function IncomeTable({data, onDelete}:Props) {
 
  const handleDelete = async(id:number) => {
    try {
      await deleteIncome(id);
      onDelete(id)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="">
      <table className="min-w-full text-white rounded-lg p-4 overflow-x-hidden overflow-y-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left font-bold">Source</th>
            <th className="py-2 px-4 border-b text-left font-bold">Amount</th>
            <th className="py-2 px-4 border-b text-left font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((income) => (
            <tr key={income.id}>
              <td className="py-2 px-4 text-left hover:bg-[#27272A] transition-colors">
                {income.motivoEntrada}
              </td>
              <td className="py-2 px-4 text-left hover:bg-[#27272A] transition-colors">
                {income.entradaNum}
              </td>
              <td className="py-2 px-4 text-left cursor-pointer">
                <div className="flex gap-4">
                  <IconTrash color="red" onClick={() => handleDelete(income.id)} />
                  <IconPencil />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeTable;
