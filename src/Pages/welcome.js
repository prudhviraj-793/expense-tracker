import { Fragment, useContext, useRef } from "react";
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
    ctx.expenses.push(expense);
  }

  function editHandler(id, amount, des, cat) {
    amountRef.current.value = amount
    descriptionRef.current.value = des
    categoryRef.current.value = cat
    deleteExpeses(id)
  }

  function deleteHandler(id) {
    deleteExpeses(id)
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
                  <button onClick={() => editHandler(exp.id,exp.amount,exp.description,exp.category)} >Edit</button>
                  <button onClick={() => deleteHandler(exp.id)} >Delete</button>
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
