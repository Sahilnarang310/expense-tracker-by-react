import { useEffect, useState } from "react";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItems";
import ExpenseChart from "./ExpenseChart";
import { useAuth } from "../../store/auth-context";
const Expense = (props) => {
  const authCtx= useAuth()
  const [filteredYear, setFilteredYear] = useState("2023");
  const [filteredExpense, setFilteredExpense] = useState(authCtx.expenses);
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    const filterExpense = authCtx.expenses.filter((expense) => {
      const date=expense.date.split('-')[0];
      if (date == selectedYear) return expense;
    });
    setFilteredExpense(filterExpense);
  };
  useEffect(()=>{
    filterChangeHandler(filteredYear)
  },[filteredYear,authCtx.expenses])
  return (
    <Card className="p-4 rounded-lg mx-20 m-2 bg-slate-600">
      <ExpenseFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpenseChart expenses={filteredExpense}/>
      {filteredExpense.length === 0 ? (
        <p className="text-white">No Expense Items</p>
      ) : (
        filteredExpense.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      )}
    </Card>
  );
};

export default Expense;
