import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import Buttons from "./Buttons";
import ExpensesFrom from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import "../css/welcome.css";
import { Fragment } from "react";

function Welcome() {
  const theme = useSelector((state) => state.theme.theme);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      {!isAuth && <Navigate to='/login' /> }
      {isAuth && (
        <div className="welcome">
          <div className={theme}>
            <div>
              <p>Welcome to expenses tracker</p>
              <p>
                Your profile is incomplete.
                <Link to="profile">Complete now</Link>
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
      )}
    </Fragment>
  );
}

export default Welcome;
