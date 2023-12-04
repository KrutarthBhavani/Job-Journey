import { actions } from "./constants";

const addJob = (
    position, 
    company,
    salary,
    category,
    jobType,
    location,
    url,
    desc
    ) => ({
    type: actions.add_job,
    payload: {
        position: position,
        company: company,
        salary: salary,
        category: category,
        jobType: jobType,
        location: location,
        url: url,
        desc: desc
    }
})

export {addJob}