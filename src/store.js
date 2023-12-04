import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { jobReducer } from "./reducers/jobReducer";

export const store = configureStore(
    {reducer: jobReducer},
    composeWithDevTools()
)