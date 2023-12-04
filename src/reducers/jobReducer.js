import { actions } from "../constants";
import {v4 as uuid} from 'uuid';

let initialState = {
    id: "",
    position: "" ,
    company: "",
    salary: 0,
    category: "",
    jobType: "",
    location: "",
    url: "",
    desc: ""
}

export const jobReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch(type){
        case actions.add_job:
            console.log('payload', JSON.stringify(payload))
            console.log('state', JSON.stringify(state))

            return {
                id: uuid(),
                position: payload.position,
                company: payload.company,
                salary: payload.salary,
                category: payload.category,
                jobType: payload.jobType,
                location: payload.location,
                url: payload.url,
                desc: payload.desc
            }
        
        default: return state
    }
}