import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/Login";
import NavBar from "./Pages/NavBar";
import SignUpPage from "./Pages/SignUpPage/SignUp";
import Welcome from "./Pages/WelcomePage/Welcome";

function App() {
  const token = localStorage.getItem("user@mail.com");
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <SignUpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        {token && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
      </Switch>
    </Fragment>
  );
}

export default App;
