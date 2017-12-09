import { ajax } from '../../util' 
import history from '../../history' 
import { fetchedToken, isLogin } from '../../actions'

let testApi = {
    getFavoriteList: false,
}
export function isLoggingOut(data) {
    return {
        type: 'IS_LOGGING_OUT',
        data
    }
}

export function logoutError(data) {
    return {
        type: 'LOGOUT_ERROR',
        data
    }
}

export function logout() {
    return (dispatch) => {
        const url = '/rest-Auth/logout/'

        dispatch(isLoggingOut(true))
        ajax(url, {}, 'POST').then(res => {
            dispatch(isLoggingOut(false))
            if (!res.hasError) {
                localStorage.removeItem('token')
                dispatch(fetchedToken(''))
                dispatch(isLogin(false))
                history.push('/')
            }
            dispatch(isLoggingOut(false))
        })
    }
}

export function getFavoriteListSuccess(data) {
    return {
        type: 'GET_FAVORITE_LIST_SUCCESS',
        data
    }
}

export function isFavoriteList(data) {
    return {
        type: 'FAVORITE_LIST',
        data
    }
}

export function getFavoriteListError(data) {
    return {
        type: 'GET_FAVORITE_LIST_ERROR',
        data
    }
}

export function getFavoriteList() {
    return (dispatch) => {
        dispatch(isFavoriteList(true))
        const url = '/api/user/get_favorites/'
        if (testApi.getFavoriteList === true) {
            let favoritelist = {
                list: [
                    { id: 1, name: 'fav1', },
                    { id: 2, name: 'fav2', },
                    { id: 3, name: 'fav3' }
                ]
            }
            dispatch(getFavoriteListSuccess(favoritelist))
        } else {
            ajax(url, {}, 'GET').then(res => {
                if (res.hasError) {
                    dispatch(getFavoriteListError(res[Object.keys(res)[0]]))
                } else {
                    dispatch(getFavoriteListSuccess(res))
                }
                dispatch(isFavoriteList(false))
            })
        }
    }
}
