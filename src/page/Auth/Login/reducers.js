export function login(state, action) {
    if(!state){
        state = {isSubmitting: false, error: '', isLogin: localStorage.getItem('token') ? true : false}
    }
    switch (action.type) {
        case 'LOGIN_ERROR':
            return Object.assign({}, state, {error: action.data})

        case 'LOGINING':
            return Object.assign({}, state, {isSubmitting: action.data})

        case 'IS_LOGIN':
            return Object.assign({}, state, {isLogin: action.data})

        default:
            return state
    }
}
