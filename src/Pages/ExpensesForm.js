import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expensesSlice";

function ExpensesFrom() {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dispacth = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const expense = useSelector(state => state.expenses)
  const total = useSelector(state => state.expenses.total)

  useEffect(() => {
    if (expense.editExpense) {
      amountRef.current.value = expense.editExpense.amount
      descriptionRef.current.value = expense.editExpense.description
      categoryRef.current.value = expense.editExpense.category
    }
    dispacth(expensesActions.editExpense(''))
  }, [expense, dispacth])
  

  function addExpenseHandler(e) {
    e.preventDefault();
    const expense = {
      userId,
      expense: {
        id: Math.random().toString(),
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      },
      total: total + Number(amountRef.current.value)
    };
    dispacth(expensesActions.addExpense(expense));
    amountRef.current.value = "";
    descriptionRef.current.value = "";
  }

  return (
    <form onSubmit={addExpenseHandler}>
      <input
        id="number"
        type="number"
        ref={amountRef}
        placeholder="Enter Amount"
        required
      />
      <input
        id="description"
        type="text"
        ref={descriptionRef}
        placeholder="Description"
        required
      />
      <select name="category" id="category" ref={categoryRef}>
        <option value="food">Food</option>
        <option value="travel">travel</option>
        <option value="shopping">shopping</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpensesFrom;
