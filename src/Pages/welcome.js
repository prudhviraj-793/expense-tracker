import { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { addExpeses, deleteExpeses, verifyEmail } from "../Api/api";
import { authActions } from "../store/authSlice";
import { expensesActions } from "../store/expensesSlice";
import { themeActions } from "../store/themeSlice";

function Welcome() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const expenses = useSelector((state) => state.expenses.expenses);
  const theme = useSelector((state) => state.theme.theme);
  const dispacth = useDispatch();

  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  let amount = 0;
  for (let exp of expenses) {
    amount += exp.amount;
  }

  const getExpenses = useCallback(async () => {
    const url =
      "https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw data.error.message;
      }
      const allExpenses = [];
      for (const key in data) {
        const expenseData = {
          id: key,
          ...data[key],
        };
        allExpenses.push(expenseData);
      }
      return allExpenses;
    } catch (error) {
      alert(error);
      return;
    }
  }, []);

  useEffect(() => {
    getExpenses().then((data) => dispacth(expensesActions.getExpenses(data)));
  }, [getExpenses, dispacth]);

  async function verifyEmailHandler(e) {
    e.preventDefault();
    await verifyEmail(token);
  }

  function logoutHandler(e) {
    e.preventDefault();
    localStorage.clear();
    dispacth(authActions.isAuthenticated(false));
    navigate("/login");
  }

  function addExpenseHandler(e) {
    e.preventDefault();
    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    addExpeses(expense);
    dispacth(expensesActions.addExpense(expense));
    amountRef.current.value = "";
    descriptionRef.current.value = "";
  }

  function editHandler(id, amount, des, cat) {
    amountRef.current.value = amount;
    descriptionRef.current.value = des;
    categoryRef.current.value = cat;
    deleteExpeses(id);
    dispacth(expensesActions.deleteExpense(id));
  }

  async function deleteHandler(id) {
    await deleteExpeses(id);
    dispacth(expensesActions.deleteExpense(id));
  }

  function permiumHandler(e) {
    e.preventDefault();
    dispacth(themeActions.darkMode());
  }

  function lightModeHandler(e) {
    e.preventDefault();
    dispacth(themeActions.lightMode());
  }

  function setHref() {
    const downloadble = expenses.map(
      (exp) => `${exp.amount}-${exp.description}-${exp.category}`
    );
    const blob = new Blob([...downloadble]);
    return URL.createObjectURL(blob);
  }

  return (
    <Fragment>
      {isAuth && (
        <div className={theme}>
          <div>
            <p>Welcome to expenses tracker</p>
            <p>
              Your profile is incomplete.<Link to="profile">Complete now</Link>
            </p>
          </div>
          <div>
            <button onClick={verifyEmailHandler}>Verify Email</button>
            <button onClick={logoutHandler}>Logout</button>
            {amount > 10000 && (
              <div>
                <button onClick={permiumHandler}>Premium</button>
                <button onClick={lightModeHandler}>Toggle</button>
              </div>
            )}
          </div>
          <div>
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
          </div>
          {expenses?.length > 0 && (
            <div>
              <div>
                <a href={`${setHref()}`} download="expenses.csv">
                  Download
                </a>
              </div>
              <ul>
                {expenses.map((exp) => {
                  return (
                    <li key={exp.id}>
                      {exp.amount}-{exp.description}-{exp.category}
                      <button
                        onClick={() =>
                          editHandler(
                            exp.id,
                            exp.amount,
                            exp.description,
                            exp.category
                          )
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteHandler(exp.id)}>
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Welcome;
