import { expensesActions } from "./expensesSlice";

export function getData() {
  return async (dispacth) => {
    async function fetchData() {
      const url = `https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses.json`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw data.error.message;
        }
        const expensesData = {
          userId: data.userId || '',
          expenses: data.expenses || []
        }
        dispacth(expensesActions.replaceExpenses(expensesData))
      } catch (error) {
        alert(error);
        return;
      }
    }
    await fetchData();
  };
}

export const getUserProfile = async (token, mail) => {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idToken: token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const existingUser = data.users.find((user) => user.email === mail);
  const user = {
    displayName: existingUser.displayName,
    photoUrl: existingUser.photoUrl,
  };
  return user;
};

export async function updateProfile(details) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.error.message;
    }
  } catch (error) {
    alert(error);
  }
}

export function addExpeses(exp) {
  return async () => {
    async function sendRequest() {
      const url = `https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses.json`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(exp),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw data.error.message;
        }
      } catch (error) {
        alert(error);
        return;
      }
    }
    await sendRequest()
  };
}
