import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../Api/api";
import { authActions } from "../store/authSlice";
import { themeActions } from "../store/themeSlice";

function Buttons() {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const total = useSelector(state => state.expenses.total)

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

  function permiumHandler(e) {
    e.preventDefault();
    dispacth(themeActions.darkMode());
  }

  function lightModeHandler(e) {
    e.preventDefault();
    dispacth(themeActions.lightMode());
  }
  return (
    <div>
      <button onClick={verifyEmailHandler}>Verify Email</button>
      <button onClick={logoutHandler}>Logout</button>
      {total > 10000 && (
        <div>
          <button onClick={permiumHandler}>Premium</button>
          <button onClick={lightModeHandler}>Toggle</button>
        </div>
      )}
    </div>
  );
}

export default Buttons;
