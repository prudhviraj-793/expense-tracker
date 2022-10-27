import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import ResetPassword from "./Pages/resetPassword";
import SignUp from "./Pages/signup";
import Welcome from "./Pages/welcome";
import { addExpeses, getData } from "./store/actions";

let isIntial = true;
function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const expenses = useSelector((state) => state.expenses);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getData());
  }, [dispacth]);
  useEffect(() => {
    if (isIntial) {
      isIntial = false;
      return;
    }
    if (userId) {
      dispacth(addExpeses(expenses));
    }
  }, [dispacth, expenses, userId]);
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {isAuth && (
        <Route path="/welcome" element={<Welcome />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      )}
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
