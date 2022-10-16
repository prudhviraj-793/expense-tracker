import { Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import Welcome from "./Pages/WelcomePage/Welcome";
import Layout from "./UI/Layout";

function App() {
  const token = localStorage.getItem("user@mail.com");
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
