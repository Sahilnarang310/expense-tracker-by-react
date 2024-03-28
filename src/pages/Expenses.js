import React, { useState } from 'react'
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import Expense from '../components/Expense/Expense';


const Expenses = () => {
  return (
    <div className="bg-green-200 h-screen p-2">
      <ExpenseForm />
      <Expense  />
    </div>
  );
}

export default Expenses