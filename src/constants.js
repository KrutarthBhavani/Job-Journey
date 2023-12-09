export{
    actions,
    categories,
    job_type
}

const actions = {
    add_job: 'ADD_JOB',
    done_add_job: 'DONE_ADD_JOB',
    edit_job: 'EDIT_JOB',
    delete_job: 'DELETE_JOB',
    done_edit_job: 'DONE_EDIT_JOB',
    set_board_name: 'SET_BOARD_NAME'
}

const categories = [
    "Wishlist",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
    "Ghosted"
]

const job_type = [
    "Remote",
    "Hybrid",
    "Onsite"
]