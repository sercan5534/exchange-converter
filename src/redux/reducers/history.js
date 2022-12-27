import { ADD_CONVERSION, DELETE_CONVERSION } from "../enums"

const initialState = {
    conversions: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CONVERSION:
            return { ...state, conversions: [...state.conversions, payload] }
        case DELETE_CONVERSION:
            return { ...state, conversions: state.conversions.filter((i, ind) => ind != payload.index) }
        default:
            return state
    }
}
