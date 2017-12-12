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

export function uploadCommentSuccess(data) {
    return {
        type: 'UPLOAD_COMMENT_SUCCESS',
        data
    }
}

export function uploadCommentError(data) {
    return {
        type: 'UPLOAD_COMMENT_ERROR',
        data
    }
}

export function uploadComment(data) {
    return (dispatch) => {
        const url = '/api/comment_upload'
        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(uploadCommentError(res[Object.keys(res)[0]]))
            } else {
                dispatch(uploadCommentSuccess(res))
            }
        })
    }
}

export function deleteCommentSuccess(data) {
    return {
        type: 'UPLOAD_COMMENT_SUCCESS',
        data
    }
}

export function deleteCommentError(data) {
    return {
        type: 'UPLOAD_COMMENT_ERROR',
        data
    }
}

export function deleteComment(data) {
    return (dispatch) => {
        const url = '/api/comment_upload'
        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(deleteCommentError(res[Object.keys(res)[0]]))
            } else {
                dispatch(deleteCommentSuccess(res))
            }
        })
    }
}