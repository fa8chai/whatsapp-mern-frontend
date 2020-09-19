export const initialState = {
    user: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return state = {}
        default:
            return state;
    }
};

export default reducer;