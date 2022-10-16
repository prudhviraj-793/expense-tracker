import { Fragment } from "react";
import { Route, useHistory } from "react-router-dom";
import Update from "../Update";

function Welcome() {
  const history = useHistory();

  function onClickHandler(e) {
    e.preventDefault();
    history.push("/welcome/update");
  }

  return (
    <Fragment>
      <div className="header">
        <p>Welcome to Expense Tracker</p>
        <div>
          Your profile is incomplete.
          <button onClick={onClickHandler}>Complete now</button>
        </div>
      </div>
      <Route path="/welcome/update">
        <Update />
      </Route>
    </Fragment>
  );
}

export default Welcome;
