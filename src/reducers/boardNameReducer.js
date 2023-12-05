import { actions } from "../constants"

let initialState = "Job Hunt 2023"

export const boardNameReducer = (state = initialState, action) => {
    let {type, payload} = action

    switch(type){
        case actions.set_board_name:
            return payload.board_name
        default: return state
    }
}