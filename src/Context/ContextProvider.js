import { useCallback, useEffect, useState } from "react";
import Context from "./Context";

function ContextProvider(props) {
  const [userId, setUserId] = useState(localStorage.key(0));
  const [token, setToken] = useState(localStorage.getItem(userId));
  const [userProfile, setUserProfile] = useState({});
  const [expenses, setExpenses] = useState([]);

  const getExpenses = useCallback(async () => {
    const url =
      "https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw data.error.message;
      }
      const allExpenses = [];
      for (const key in data) {
        const expenseData = {
          id: key,
          ...data[key],
        };
        allExpenses.push(expenseData);
      }
      return allExpenses;
    } catch (error) {
      alert(error);
      return;
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await getExpenses();
      if (!res) {
        return;
      }
      setExpenses([...res]);
    }
    fetchData();
  }, [getExpenses]);

  function addUserIdHandler(data) {
    setUserId(data);
  }

  function addTokenHandler(data) {
    setToken(data);
  }

  function addUserProfileHandler(data) {
    setUserProfile(data);
  }

  // function getExpensesHandler(data) {
  //   if (expenses.length !== data.length) {
  //     setExpenses(data);
  //   }
  // }

  function addExpenseHandler(data) {
    setExpenses([...expenses, data])
  }

  function deleteexpenseHandler(id) {
    expenses.forEach((item, idx) => {
      if (id === item.id) {
        expenses.splice(idx, 1)
        setExpenses([...expenses])
      }
    })
  }

  const data = {
    userId,
    token,
    userProfile,
    expenses,
    addUserId: addUserIdHandler,
    addToken: addTokenHandler,
    addUserProfile: addUserProfileHandler,
    // getExpenses: getExpensesHandler,
    addExpense: addExpenseHandler,
    deleteExpense: deleteexpenseHandler
  };
  return <Context.Provider value={data}>{props.children}</Context.Provider>;
}

export default ContextProvider;
