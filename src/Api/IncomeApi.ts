import axios from 'axios';

export const deleteIncome = async (id:number) => {
    try {
        const response = await axios.delete(`http://localhost:5432/api/deleteincome/income/${id}`)
        console.log(response);
    } catch (error) {
        console.log(error)
        throw new Error(`error eliminar un ingreso`);
    }
}