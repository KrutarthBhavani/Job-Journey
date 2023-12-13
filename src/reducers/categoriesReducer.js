import { actions } from "../constants";

const initialState = []

export const categoriesReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch(type){
        case actions.set_categories:
            return payload.categories
        
        default:
            return state
    }
}