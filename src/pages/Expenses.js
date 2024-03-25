import React, { useState } from 'react'
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import Expense from '../components/Expense/Expense';
import expense from '../store/ExpenseM';

const Expenses = () => {
  const [expenseData, setExpenseData] = useState(expense);
  function addExpenseHandler(value) {
    setExpenseData((prevValues) => {
      return [value, ...prevValues];
    });
    console.log(expenseData);
  }
  return (
    <div className="bg-green-200 h-screen p-2">
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <Expense expenses={expenseData} />
    </div>
  );
}

export default Expenses