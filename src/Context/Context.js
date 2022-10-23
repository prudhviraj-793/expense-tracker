import { createContext } from "react"

const Context = createContext({
    userId: '',
    token: '',
    userProfile: {},
    expenses: [],
    addUserId: () => {},
    addToken: () => {},
    addUserProfile: () => {},
    getExpenses: () => {},
    addExpense: () => {}
})

export default Context