export interface ExpenseUser {
  fechaGasto: string,
  gastoNum: number,
  id: number,
  motivoGasto: string,
  usuarioId: number
};

export interface IncomeUser {
    id: number;
    usuarioId: number;
    entradaNum: number;
    fechaEntrada: Date;
    motivoEntrada: string;
}
