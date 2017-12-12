import {combineReducers} from 'redux'

import * as authReducers from './auth'
import * as homeReducers from '../components/Editor/reducers'
import * as loginReducers from '../page/Auth/Login/reducers'

const reducers = Object.assign(
    {},
    authReducers,
    homeReducers,
    loginReducers,
)

export default combineReducers(reducers)
