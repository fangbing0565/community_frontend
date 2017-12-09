import { ajax } from '../util'
export function getPromptSuccess(data) {
    return {
        type: 'GET_PROMPT_SUCCESS',
        data
    }
}

export function isGettingPrompt(data) {
    return {
        type: 'IS_GETTING_PROMPT',
        data
    }
}

export function getPromptError(data) {
    return {
        type: 'GET_PROMPT_ERROR',
        data
    }
}

export function getPrompt(data) {
    return (dispatch) => {
        console.log(1)
        // let res = ['res1','res2']
        // dispatch(getPromptSuccess(res))
        // dispatch(isGettingPrompt(true))
        const url = '/prediction'
        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(getPromptError(res[Object.keys(res)[0]]))
            } else {
                dispatch(getPromptSuccess(res))
            }
            // dispatch(isGettingPrompt(false))
        })
    }
}


export function resizing(width) {
    return {
        type: 'SCREEN_WIDTH',
        width
    }
}

export function isLogin(data) {
    return {
        type: 'IS_LOGIN',
        data
    }
}

export function fetchedToken(fetchedToken) {
    return {
        type: 'AUTH_TOKEN',
        fetchedToken
    }
}

export function fetchToken() {
    return (dispatch) => {
        dispatch(fetchedToken(localStorage.getItem('token') || ''))
    }
}

export function fetchedUser(data) {
    return {
        type: 'FETCH_USER_SUCCESS',
        data
    }
}

export function isFetchingUser(data) {
    return {
        type: 'FETCHING_USER',
        data
    }
}

export function fetchUserError(data) {
    return {
        type: 'FETCH_USER_ERROR',
        data
    }
}

export function fetchUser() {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            dispatch(isFetchingUser(true))
            const url = '/rest-auth/user/'

            ajax(url, {}, 'GET').then(res => {
                if (res.hasError) {
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    dispatch(fetchedUser({}))
                    dispatch(fetchedToken(''))
                } else {
                    localStorage.setItem('user', JSON.stringify(res))
                    dispatch(fetchedUser(res))
                }
                dispatch(isFetchingUser(false))
            })
        }
    }
}

export function updateFavoriteArticleSuccess(data) {
    return {
        type: 'UPDATE_FAVORITE_ARTICLE_SUCCESS',
        data
    }
}

export function isUpdatingFavoriteArticle(data) {
    return {
        type: 'UPDATING_FAVORITE_ARTICLE',
        data
    }
}

export function updateFavoriteArticleError(data) {
    return {
        type: 'UPDATE_FAVORITE_ARTICLE_ERROR',
        data
    }
}

export function updateFavoriteArticle(data) {
    return (dispatch) => {
        dispatch(isUpdatingFavoriteArticle(true))
        const url = '/api/user/favorites/'

        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(updateFavoriteArticleError(res[Object.keys(res)[0]]))
            } else {
                dispatch(updateFavoriteArticleSuccess(res))
            }
            dispatch(isUpdatingFavoriteArticle(false))
        })
    }
}
