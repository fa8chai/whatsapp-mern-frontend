
export const setUser = (payload) => {
    return {
        type: 'SET_USER',
        payload
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}