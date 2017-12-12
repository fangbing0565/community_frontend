import {combineReducers} from 'redux'

import * as authReducers from './auth'
import * as homeReducers from '../page/Editor/reducers'
import * as loginReducers from '../page/Auth/Login/reducers'
import * as articleReducers from '../page/Article/reducers'
import * as detailReducers from '../page/Detail/reducers'

const reducers = Object.assign(
    {},
    authReducers,
    homeReducers,
    loginReducers,
    articleReducers,
    detailReducers,
)

export default combineReducers(reducers)
