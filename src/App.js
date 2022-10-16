import { Route, Switch } from "react-router-dom";
import SingUpPage from "./Pages/SignUpPage/SignUpPage";
import Layout from "./UI/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <SingUpPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
