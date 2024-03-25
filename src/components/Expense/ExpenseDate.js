import Card from "../UI/Card";

const ExpenseDate = (props) => {
  const date = props.date.getDate();
  const month = props.date.getMonth() + 1;
  const year = props.date.getFullYear();
  return (
    <Card className="p-2 flex-none  bg-slate-800 border border-cyan-200 w-32">
      <span>{date}</span>
      <span>{month}</span>
      <span>{year}</span>
    </Card>
  );
};

export default ExpenseDate;
