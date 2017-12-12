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

