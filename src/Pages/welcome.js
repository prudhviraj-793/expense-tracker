import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { addExpeses, deleteExpeses, verifyEmail } from "../Api/api";
import Context from "../Context/Context";

function Welcome() {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const expenses = ctx.expenses;

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
    async function fetchData() {
      const res = await getExpenses();
      if (!res) {
        return;
      }
      ctx.getExpenses(res);
    }
    fetchData();
  }, [getExpenses, ctx]);

  async function verifyEmailHandler(e) {
    e.preventDefault();
    await verifyEmail(ctx.token);
  }

  function logoutHandler(e) {
    e.preventDefault();
    localStorage.clear();
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
    ctx.addExpense(expense);
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  }

  function editHandler(id, amount, des, cat) {
    amountRef.current.value = amount;
    descriptionRef.current.value = des;
    categoryRef.current.value = cat;
    deleteExpeses(id);
  }

  function deleteHandler(id) {
    deleteExpeses(id);
  }

  return (
    <Fragment>
      <div>
        <p>Welcome to expenses tracker</p>
        <p>
          Your profile is incomplete.<Link to="profile">Complete now</Link>
        </p>
      </div>
      <div>
        <button onClick={verifyEmailHandler}>Verify Email</button>
        <button onClick={logoutHandler}>Logout</button>
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
      {expenses.length > 0 && (
        <div>
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
                  <button onClick={() => deleteHandler(exp.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </Fragment>
  );
}

export default Welcome;
