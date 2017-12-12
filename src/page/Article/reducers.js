export function articles(state , action) {
    if(!state){
        state = {fetching: false, entities: {}, error: ''}
    }
    switch (action.type) {
        case 'FETCHING_ARTICLES':
            return {...state, fetching: action.data}

        case 'FETCH_ARTICLES_SUCCESS':
            return {...state, entities: action.data}

        case 'FETCH_ARTICLES_ERROR':
            return {...state, error: action.data}

        default:
            return state
    }
}