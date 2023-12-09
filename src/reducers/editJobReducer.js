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

export const editJobReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch(type){
        case actions.edit_job:
            console.log('payload', JSON.stringify(payload))

            return {
                id: payload.id,
                position: payload.position,
                company: payload.company,
                salary: payload.salary,
                category: payload.category,
                jobType: payload.jobType,
                location: payload.location,
                url: payload.url,
                desc: payload.desc,
            }

        case actions.delete_job:
            console.log('payload', JSON.stringify(payload))

            return {
                id: payload.id,
                delete: true
            }


        case actions.done_edit_job:
            return initialState
        
        default: return state
    }
}