import { SET_EXCHAGE_HISTORY, GET_SYMBOLS } from "../enums"

const initialState = {
    symbols: null,
    changeHistory: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        
        case GET_SYMBOLS:
            return { ...state, symbols: payload }
        case SET_EXCHAGE_HISTORY:
            return { ...state, changeHistory: payload }

        default:
            return state
    }
}
