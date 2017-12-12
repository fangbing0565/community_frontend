export function logout(state, action) {
    if(!state){
        state = {isSubmitting: false, error: ''}
    }
    switch (action.type) {
        case 'LOGGING_OUT':
            return Object.assign({}, state, {isSubmitting: action.data})

        case 'LOG_OUT_ERROR':
            return Object.assign({}, state, {error: action.data})

        default:
            return state
    }
}
