import authSlice from "./auth-slice";

import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile-slice";
import expenseSlice from "./expense-slice";

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:expenseSlice.reducer,
        profile:profileSlice.reducer,
    }
});

export const authActions=authSlice.actions;
export const profeleActions=profileSlice.actions;
export const expenseActions=expenseSlice.actions;
export default store;