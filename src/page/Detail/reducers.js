export function detail(state , action) {
    if(!state){
        state = {fetching: false, entities: {}, error: ''}
    }
    switch (action.type) {
        case 'FETCHING_DETAIL':
            return {...state, fetching: action.data}

        case 'FETCH_DETAIL_SUCCESS':
            return {...state, entities: action.data.data}

        case 'FETCH_DETAIL_ERROR':
            return {...state, error: action.data}

        default:
            return state
    }
}