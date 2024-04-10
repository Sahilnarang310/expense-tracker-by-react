import axios from "axios";
import { useAuth } from "../../store/auth-context";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store";

const ExpenseItem = ({ expense }) => {
  const authState=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const editHandler=(e)=>{
    e.target.parentElement.remove();
    dispatch(expenseActions.editExpense(expense.id));
  }
  const deleteHandler =async (e) => {
    const userPath=authState.email.split('@')[0];
    let response;
    let url = `https://e-commerce-ae96e-default-rtdb.firebaseio.com/${userPath}/${expense.id}.json`;
    response= await axios.delete(url);
    dispatch(expenseActions.deleteExpense(expense.id));
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
