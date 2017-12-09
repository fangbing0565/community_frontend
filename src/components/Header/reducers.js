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

export function favoriteList(state , action) {
    if(!state){
        state = {isSubmitting: false, error: ''}
    }
    switch (action.type) {
        case 'FAVORITE_LIST':
            return {...state, fetching: action.data}

        case 'GET_FAVORITE_LIST_SUCCESS':
            return {...state, entities: action.data}

        case 'GET_FAVORITE_LIST_ERROR':
            return {...state, error: action.data}

        default:
            return state
    }
}