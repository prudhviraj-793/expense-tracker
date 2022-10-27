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
      state.total = action.payload.total
    },
    addExpense(state, action) {
      state.userId = action.payload.userId;
      state.expenses.push(action.payload.expense);
      state.total = action.payload.total
    },
    editExpense(state, action) {
      state.editExpense = action.payload;
    },
    deleteExpense(state, action) {
      const id = action.payload;
      const expenses = [...state.expenses];
      expenses.forEach((item, idx) => {
        if (item.id === id) {
          state.total = state.total - Number(item.amount)
          expenses.splice(idx, 1);
          state.expenses = [...expenses];
        }
      });
    },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
