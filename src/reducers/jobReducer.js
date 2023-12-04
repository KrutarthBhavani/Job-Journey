import { actions } from "../constants";
import {v4 as uuid} from 'uuid';


export const jobReducer = (state, action) => {
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
    }
}