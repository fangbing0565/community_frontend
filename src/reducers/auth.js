export function fetchedToken(state, action) {
    if(!state){
        state = localStorage.getItem('token') || ''
    }
    switch (action.type) {
        case 'AUTH_TOKEN':
            return action.fetchedToken

        default:
            return state
    }
}

export function user(state, action) {
    if(!state){
        state = {isFetching: false, entities: {}, error: ''}
    }
    switch (action.type) {
        case 'FETCHING_USER':
            return Object.assign({}, state, {isFetching: action.data})

        case 'FETCH_USER_SUCCESS':
            return Object.assign({}, state, {entities: action.data})

        case 'FETCH_USER_ERROR':
            return Object.assign({}, state, {error: action.data})

        default:
            return state
    }
}