import Card from "../UI/Card";

const ExpenseDetails = (props) => {
  return (
    <Card className="flex-grow bg-slate-800 flex justify-between border border-red-400 p-2">
        <div className=""> {props.title} </div>
        <div className=""> {props.amount} </div>
    </Card>
  );
};

export default ExpenseDetails;
