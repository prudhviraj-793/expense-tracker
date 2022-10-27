import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Buttons from "./Buttons";
import ExpensesFrom from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import "../css/welcome.css";

function Welcome() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="welcome">
      <div className={theme}>
        <div>
          <p>Welcome to expenses tracker</p>
          <p>
            Your profile is incomplete.<Link to="profile">Complete now</Link>
          </p>
        </div>
        <Buttons />
        <ExpensesFrom />
        <ExpensesList />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
