import {ajax} from '../../util'
export function fetchedDetail(data) {
    return {
        type: 'FETCH_DETAIL_SUCCESS',
        data
    }
}

export function fetchingDetail(data) {
    return {
        type: 'FETCHING_DETAIL',
        data
    }
}

export function fetchDetailError(data) {
    return {
        type: 'FETCH_DETAIL_ERROR',
        data
    }
}

export function getDetail(data) {
    return (dispatch) => {
        dispatch(fetchingDetail(true))
        const url = '/api/detail/' + data
        ajax(url, {}, 'GET').then(res => {
            if (res.hasError) {
                dispatch(fetchDetailError(res[Object.keys(res)[0]]))
            } else {
                dispatch(fetchedDetail(res))
            }
            dispatch(fetchingDetail(false))
        })
    }
}