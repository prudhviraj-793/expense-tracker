export async function signup(user) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
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

export async function login(user) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.error.message;
    }
    return data.idToken;
  } catch (error) {
    alert(error);
    return;
  }
}

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

export async function verifyEmail(token) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
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

export async function resetPassword(details) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
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
    console.log(data);
  } catch (error) {
    alert(error);
    return;
  }
}

export async function addExpeses(exp) {
  const url =
    "https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses.json";
  try {
    const response = await fetch(url, {
      method: "POST",
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

export async function deleteExpeses(id) {
  const url = `https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses/${id}.json`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
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

export async function editExpeses(id, updatedExpense) {
  const url = `https://expense-tracker-54771-default-rtdb.firebaseio.com/expenses/${id}.json`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(updatedExpense),
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