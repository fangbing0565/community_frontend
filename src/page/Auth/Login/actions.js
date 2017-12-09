import { ajax } from '../../../util'
import { isLogin } from '../../../actions'

function afterLogin(res) {
    localStorage.setItem('user', JSON.stringify(res.user))
    localStorage.setItem('token', res.token)

    const backUrl = localStorage.getItem('backUrl') || ''

    if (backUrl) {
        window.location.href = backUrl
    } else {
        window.location.href = '/'
    }
}

export function logining(data) {
    return {
        type: 'LOGINING',
        data
    }
}

export function loginError(data) {
    return {
        type: 'LOGIN_ERROR',
        data
    }
}

export function login(data) {
    const url = 'rest-Auth/login/'

    return (dispatch) => {
        dispatch(logining(true))
        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(loginError(res[Object.keys(res)[0]]))
            } else {
                dispatch(isLogin(true))
                afterLogin(res)
            }
            dispatch(logining(false))
        })
    }
}
