import { useState } from "react";
import Card from "../UI/Card";
import { useAuth } from "../../store/auth-context";

const ExpenseForm = (props) => {
  const authCtx=useAuth();
  const [expenseAmt, setExpenesAmt] = useState("");
  const [expenseTitle, setExpenesTitle] = useState("");
  const [expenseDate, setExpenesDate] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormHandler = (e) => {
    setIsFormVisible(prevValue=>!prevValue);
  };
  function submitHandler(e) {
    e.preventDefault();
    const expenseData = {
      id:new Date().toISOString(),
      title: expenseTitle,
      amount: expenseAmt,
      date: new Date(expenseDate),
    };
    authCtx.addExpense(expenseData);
    setExpenesAmt("");
    setExpenesDate("");
    setExpenesTitle("");
    setIsFormVisible(prevValue=>!prevValue);
  }
  return (
    <Card className=" bg-slate-700 w-3/5 text-white mx-auto  p-5">
      {!isFormVisible ? (
        <Card className="m-2 flex justify-center  ">
          <button className="m-2 p-2 bg-slate-800 border border-cyan-200 rounded-lg" onClick={toggleFormHandler}>Add New Expense</button>
        </Card>
      ) : (
        <form onSubmit={submitHandler} className="flex flex-col">
          <Card className="m-2 p-2 bg-slate-800 border border-cyan-200">
            <label>Expense amount</label>
            <input
              type="number"
              className="text-black m-2 p-1 px-3 rounded-lg"
              name="expenseAmt"
              placeholder="Enter your amount"
              value={expenseAmt}
              onChange={(e) => setExpenesAmt(e.target.value)}
            ></input>
          </Card>
          <Card className="m-2 p-2 bg-slate-800 border border-cyan-200">
            <label>Expense Desc</label>
            <input
              type="text"
              className="text-black m-2 p-1 px-3 rounded-lg"
              name="expenseTitle"
              placeholder="Enter your item title"
              value={expenseTitle}
              onChange={(e) => setExpenesTitle(e.target.value)}
            ></input>
          </Card>
          <Card className="m-2 p-2 bg-slate-800 border border-cyan-200">
            <label>Expense date</label>
            <input
              type="date"
              className="text-black m-2 p-1 px-3 rounded-lg"
              name="expenseDate"
              placeholder="Enter your date"
              value={expenseDate}
              onChange={(e) => setExpenesDate(e.target.value)}
            ></input>
          </Card>
          <div className="flex justify-end ">
            <button className="p-2 mx-6 bg-slate-800 border border-cyan-200 rounded-lg" onClick={toggleFormHandler}  >Cancel</button>
            <button className="p-2 mx-2 bg-slate-800 border border-cyan-200 rounded-lg" type="submit">Save</button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ExpenseForm;
