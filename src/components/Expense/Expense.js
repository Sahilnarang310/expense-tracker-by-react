import { useState } from "react";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItems";
import ExpenseChart from "./ExpenseChart";
const Expense = ({ expenses }) => {
  console.log(expenses);
  const [filteredYear, setFilteredYear] = useState("2023");
  const [filteredExpense, setFilteredExpense] = useState(expenses);
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    const filterExpense = expenses.filter((expense) => {
      if (expense.date.getFullYear() == selectedYear) return expense;
    });
    setFilteredExpense(filterExpense);
    console.log(filterExpense);
  };
  console.log(filteredExpense);
  return (
    <Card className="p-4 rounded-lg mx-20 m-2 bg-slate-600">
      <ExpenseFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpenseChart expenses={expenses}/>
      {filteredExpense.length === 0 ? (
        <p className="text-white">No Expense Items</p>
      ) : (
        expenses.map((expense, i) => (
          <ExpenseItem key={i} expense={expense} />
        ))
      )}
    </Card>
  );
};

export default Expense;
