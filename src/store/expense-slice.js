import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  expenses: [],
  totalExpense: 0,
  isExpenseEdit: false,
  isExpenseFormVisible: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    toggleExpenseForm(state) {
      state.isExpenseFormVisible = !state.isExpenseFormVisible;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload)
      state.totalExpense = +state.totalExpense + +action.payload.amount;
    },
    editExpense(state, action) {
        //update the expense
    },
    deleteExpense(state,action) {
      const expenseAmt=state.expenses.filter(expense=>expense.id===action.payload.id)
        state.expenses=state.expenses.filter(expense=>expense.id!==action.payload.id)
      state.totalExpense = +state.totalExpense - +expenseAmt.amount;
    },
  },
});

export default expenseSlice;
