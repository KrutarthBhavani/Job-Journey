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

const doneAddJob = () => ({
    type: actions.done_add_job,
    payload: {}
})

const editJob = (
    id,
    position, 
    company,
    salary,
    category,
    jobType,
    location,
    url,
    desc
    ) => ({
    type: actions.edit_job,
    payload: {
        id: id,
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

const deleteJob = (id) => ({
    type: actions.delete_job,
    payload: {id: id}
})

const doneEditJob = () => ({
    type: actions.done_edit_job,
    payload: {}
})

const setBoardName = (newBoardName) => ({
    type: actions.set_board_name,
    payload: {board_name: newBoardName}
})

export {addJob, doneAddJob, editJob, deleteJob, doneEditJob, setBoardName}