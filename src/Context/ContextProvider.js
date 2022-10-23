import { useState } from "react";
import Context from "./Context";

function ContextProvider(props) {
  const [userId, setUserId] = useState(localStorage.key(0));
  const [token, setToken] = useState(localStorage.getItem(userId));
  const [userProfile, setUserProfile] = useState({});
  const [expenses, setExpenses] = useState([]);

  function addUserIdHandler(data) {
    setUserId(data);
  }

  function addTokenHandler(data) {
    setToken(data);
  }

  function addUserProfileHandler(data) {
    setUserProfile(data);
  }

  function getExpensesHandler(data) {
    if (expenses.length !== data.length) {
      setExpenses(data);
    }
  }

  function addExpenseHandler(data) {
    setExpenses([...expenses, data])
  }

  const data = {
    userId,
    token,
    userProfile,
    expenses,
    addUserId: addUserIdHandler,
    addToken: addTokenHandler,
    addUserProfile: addUserProfileHandler,
    getExpenses: getExpensesHandler,
    addExpense: addExpenseHandler
  };
  return <Context.Provider value={data}>{props.children}</Context.Provider>;
}

export default ContextProvider;
