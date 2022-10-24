import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
};


const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
    getExpenses(state, action) {
        if (state.expenses.length !== action.payload.length) {
            state.expenses = [...action.payload]
        }
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
