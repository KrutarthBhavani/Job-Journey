import { jobReducer } from "./jobReducer";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    new_job: jobReducer
})