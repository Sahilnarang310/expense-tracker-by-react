import { useEffect, useState } from "react";
import Card from "../UI/Card";
// import { useAuth } from "../../store/auth-context";
import { useAuth } from "../../store/auth-context";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store";

const ExpenseForm = (props) => {
  const authState=useSelector(state=>state.auth);
  const expenseState = useSelector((state) => state.expense);
  const dispatch=useDispatch();
  const [expenseAmt, setExpenesAmt] = useState("");
  const [expenseTitle, setExpenesTitle] = useState("");
  const [expenseCategory, setExpenesCategory] = useState("");
  const [expenseDate, setExpenesDate] = useState("");
  const toggleFormHandler = (e) => {
    dispatch(expenseActions.toggleExpenseForm());
  };
  useEffect(() => {
    setExpenesAmt(expenseState.editExpenseForm?.amount);
    setExpenesDate(expenseState.editExpenseForm?.date);
    setExpenesCategory(expenseState.editExpenseForm?.category);
    setExpenesTitle(expenseState.editExpenseForm?.title);
  }, [expenseState.isExpenseEdit]);
  async function submitHandler(e) {
    e.preventDefault();
    let expenseData = {
      title: expenseTitle,
      amount: expenseAmt,
      category: expenseCategory,
      date: new Date(expenseDate).toISOString(),
    };
    const userPath=authState.email.split('@')[0];
    let response;
    if (expenseState.isExpenseEdit) {
      let url = `https://e-commerce-ae96e-default-rtdb.firebaseio.com/${userPath}/${expenseState.editExpenseForm.id}.json`;
      response = await axios.put(url, expenseData);
    } else {
      let url = `https://e-commerce-ae96e-default-rtdb.firebaseio.com/${userPath}.json`;
      response = await axios.post(url, expenseData);
    } 
    console.log(response);
    expenseData = { ...expenseData, id: response.data.name };
    dispatch(expenseActions.addExpense(expenseData))
    setExpenesAmt("");
    setExpenesDate("");
    setExpenesTitle("");
    dispatch(expenseActions.toggleExpenseForm());
  }
  return (
    <Card className=" bg-slate-700 w-3/5 text-white mx-auto  p-5">
      {!expenseState.isExpenseFormVisible ? (
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
            <label>Category</label>
            <select
              className="text-black m-2 p-1 px-3 rounded-lg"
              value={expenseCategory}
              onChange={(e) => setExpenesCategory(e.target.value)}
            >
              <option value="Cloths">Cloths</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Room rent">Room rent</option>
            </select>
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
              className="text-black m-2 p-1 px-3 rounded-lg"
              type="date"
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
              {expenseState.isExpenseEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ExpenseForm;
