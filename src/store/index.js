import authSlice from "./auth-slice";

import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile-slice";

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        profile:profileSlice.reducer,
    }
});

export const authActions=authSlice.actions;
export default store;