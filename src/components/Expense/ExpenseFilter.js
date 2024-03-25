const ExpenseFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };
  return (
    <div className="flex justify-between">
      <label className="font-medium border outline-slate-100 rounded-lg m-1 p-1 bg-white">
        filter by year
      </label>
      <select
        className="font-medium border outline-slate-100 rounded-lg m-1 p-1 bg-white"
        value={props.selected}
        onChange={dropdownChangeHandler}
      >
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
  );
};
export default ExpenseFilter;
