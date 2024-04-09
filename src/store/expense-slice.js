import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  expenses: [],
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
    },
    editExpense(state, action) {
        //update the expense
    },
    deleteExpense(state,action) {
        const Updatedexpenses=state.expenses.map(expense=>expense.id!==action.payload.id)
        state.expenses=[...Updatedexpenses];
    },
  },
});

export default expenseSlice;
