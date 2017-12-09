import history from '../../../history' 
import { ajax } from '../../../util' 

export function registering(data) {
    return {
        type: 'REGISTERING',
        data
    }
}

export function registerError(data) {
    return {
        type: 'REGISTER_ERROR',
        data
    }
}

export function register(data) {
    const url = '/rest-Auth/registration/'

    return (dispatch) => {
        dispatch(registering(true))

        ajax(url, data, 'POST').then(res => {
            if (res.hasError) {
                dispatch(registerError(res[Object.keys(res)[0]].join(', ')))
            } else {
                history.push('/login')
            }
            dispatch(registering(false))
        })
    }
}