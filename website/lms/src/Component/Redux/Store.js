import { configureStore } from "@reduxjs/toolkit";
import  userAuthSlice  from "./UserSlice";

export const store = configureStore({
    reducer:{
        userAuth:userAuthSlice
        
    }
})