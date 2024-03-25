import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";

const ExpenseItem = ({ expense }) => {
  return (
    <Card className="flex text-white m-1">
      <ExpenseDate date={expense.date} />
      <ExpenseDetails
        amount={expense.amount}
        title={expense.title}
      />
    </Card>
  );
};

export default ExpenseItem;
