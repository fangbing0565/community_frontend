import {ajax} from '../../util'
export function fetchedArticles(data) {
    return {
        type: 'FETCH_ARTICLES_SUCCESS',
        data
    }
}

export function fetchingArticles(data) {
    return {
        type: 'FETCHING_ARTICLES',
        data
    }
}

export function fetchArticlesError(data) {
    return {
        type: 'FETCH_ARTICLES_ERROR',
        data
    }
}

export function getArticle(data) {
    return (dispatch) => {
        dispatch(fetchingArticles(true))
        const url = 'api/article/'+ data.page + '/' + data.limit
        ajax(url, {}, 'GET').then(res => {
            if (res.hasError) {
                dispatch(fetchArticlesError(res[Object.keys(res)[0]]))
            } else {
                dispatch(fetchedArticles(res))
            }
            dispatch(fetchingArticles(false))
        })
    }
}