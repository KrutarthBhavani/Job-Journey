import { actions } from "../constants";

const initialState = []

export const jobsReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch(type){
        case actions.set_jobs:
            return payload.jobs
        
        default:
            return state
    }
}