import axios from "axios";
import { useAuth } from "../../store/auth-context";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";

const ExpenseItem = ({ expense }) => {
  console.log(expense);
  const authCtx=useAuth();
  const editHandler=(e)=>{
    e.target.parentElement.remove();
    authCtx.editExpense(expense);
  }
  const deleteHandler =async (e) => {
    const userPath=authCtx.email.split('@')[0];
    let response;
    let url = `https://expense-tracker-cfb73-default-rtdb.firebaseio.com/${userPath}/${expense.id}.json`;
    response= await axios.delete(url);
    e.target.parentElement.remove();
  };
  return (
    <Card className="flex text-white m-1">
      <ExpenseDate date={expense.date} />
      <ExpenseDetails amount={expense.amount} title={expense.title} />
      <button onClick={editHandler} className="p-2 flex-none rounded-lg m-1  bg-slate-800 border border-cyan-200 w-32">
        Edit
      </button>
      <button onClick={deleteHandler} className="p-2 flex-none rounded-lg m-1  bg-slate-800 border border-cyan-200 w-32">
        Delete
      </button>
    </Card>
  );
};

export default ExpenseItem;
