export function register(state , action) {
    if(!state){
        state = {registering: false, error: ''}
    }
    switch (action.type) {
        case 'REGISTER_ERROR':
            return Object.assign({}, state, {error: action.data})

        case 'REGISTERING':
            return Object.assign({}, state, {isSubmitting: action.data})

        default:
            return state
    }
}