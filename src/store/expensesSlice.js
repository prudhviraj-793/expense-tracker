import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  userId: "",
  expenses: [],
  editExpense: "",
  total: 0,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    replaceExpenses(state, action) {
      state.userId = action.payload.userId;
      state.expenses = action.payload.expenses;
    },
    addExpense(state, action) {
      state.userId = action.payload.userId;
      state.total = state.total + Number(action.payload.expense.amount);
      state.expenses.push(action.payload.expense);
    },
    editExpense(state, action) {
      state.editExpense = action.payload;
    },
    deleteExpense(state, action) {
      const id = action.payload;
      const expenses = [...state.expenses];
      expenses.forEach((item, idx) => {
        if (item.id === id) {
          expenses.splice(idx, 1);
          state.expenses = [...expenses];
        }
      });
    },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
