import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expensesSlice";

function ExpensesList() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispacth = useDispatch();

  function editHandler(exp) {
    dispacth(expensesActions.editExpense(exp))
    dispacth(expensesActions.deleteExpense(exp.id));
  }

  async function deleteHandler(id) {
    dispacth(expensesActions.deleteExpense(id));
  }

    function setHref() {
      const downloadble = expenses.map(
        (exp) => `${exp.amount}-${exp.description}-${exp.category}`
      );
      const blob = new Blob([...downloadble]);
      return URL.createObjectURL(blob);
  }
  
  return (
    expenses?.length > 0 && (
      <div>
        <div>
          <a href={`${setHref()}`} download="expenses.csv">Download</a>
        </div>
        <ul>
          {expenses.map((exp) => {
            return (
              <li key={exp.id}>
                {exp.amount}-{exp.description}-{exp.category}
                <button onClick={() => editHandler(exp)}>Edit</button>
                <button onClick={() => deleteHandler(exp.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}

export default ExpensesList;
