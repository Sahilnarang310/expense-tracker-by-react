import { useEffect, useState } from "react";
import Card from "../UI/Card";
import { useAuth } from "../../store/auth-context";
import axios from "axios";

const ExpenseForm = (props) => {
  const authCtx=useAuth();
  const [expenseAmt, setExpenesAmt] = useState("");
  const [expenseTitle, setExpenesTitle] = useState("");
  const [expenseDate, setExpenesDate] = useState("");
  const toggleFormHandler = (e) => {
    authCtx.setIsFormVisible()
  };
  useEffect(()=>{
    setExpenesAmt(authCtx.editExpenseForm.amount);
    setExpenesDate(authCtx.editExpenseForm.date);
    setExpenesTitle(authCtx.editExpenseForm.title);
  },[authCtx.isEdit])
  async function submitHandler(e) {
    e.preventDefault();
    let expenseData = {
      title: expenseTitle,
      amount: expenseAmt,
      date: new Date(expenseDate),
    };
    const userPath=authCtx.email.split('@')[0];
    let response;
    if(authCtx.isEdit){
       let url = `https://expense-tracker-cfb73-default-rtdb.firebaseio.com/${userPath}/${authCtx.editExpenseForm.id}.json`;
       response= await axios.put(url,expenseData);
       console.log(response);
    }else{
     let url=`https://expense-tracker-cfb73-default-rtdb.firebaseio.com/${userPath}.json`;
      response=await axios.post(url,expenseData);
    } 
    expenseData = { ...expenseData, id: response.data };
    authCtx.addExpense(expenseData);
    console.log(expenseData);
    setExpenesAmt("");
    setExpenesDate("");
    setExpenesTitle("");
    authCtx.setIsFormVisible();
  }
  return (
    <Card className=" bg-slate-700 w-3/5 text-white mx-auto  p-5">
      {!authCtx.isFormVisible ? (
        <Card className="m-2 flex justify-center  ">
          <button
            className="m-2 p-2 bg-slate-800 border border-cyan-200 rounded-lg"
            onClick={toggleFormHandler}
          >
            Add New Expense
          </button>
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
            <button
              className="p-2 mx-6 bg-slate-800 border border-cyan-200 rounded-lg"
              onClick={toggleFormHandler}
            >
              Cancel
            </button>{" "}
            <button
              className="p-2 mx-2 bg-slate-800 border border-cyan-200 rounded-lg"
              type="submit"
            >
              {authCtx.isEdit ?"Update" : "Save"}
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ExpenseForm;
