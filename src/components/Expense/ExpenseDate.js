import Card from "../UI/Card";

const ExpenseDate = (props) => {
  const chartDataPoints = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const date = props.date.split("-")[2].split('T')[0];
  const month = props.date?.toString().split('-')[1];
  const year = props.date.split("-")[0];
  return (
    <Card className="p-2 flex-none m-1 bg-slate-800 border border-cyan-200 w-32">
      <span> {date} </span>
      <span> {chartDataPoints[month-1]} </span>
      <span> {year} </span>
    </Card>
  );
};

export default ExpenseDate;
