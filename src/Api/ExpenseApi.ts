import axios from 'axios';
import { ExpenseUser } from '../types';


export const deleteExpense = async (id:number) => {
    try {
        await axios.delete(`http://localhost:5432/api/deleteexpense/expensedelete/${id}`) 
    } catch (error) {
        console.log(error)
        throw new Error(`error al eliminar el gasto ${error}`);
    }
} 

export const editExpense = async (expense: ExpenseUser): Promise<ExpenseUser> => {
    try {
        await axios.put(`http://localhost:5432/api/editexpense/usuario/${expense.id}`, expense
        )

        return expense
    } catch (error) {
        console.log(error)
        return undefined as unknown as ExpenseUser;
    }
}