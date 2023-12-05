import { jobReducer } from "./jobReducer";
import { boardNameReducer } from "./boardNameReducer";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    new_job: jobReducer,
    board_name: boardNameReducer
})