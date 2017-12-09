import {combineReducers} from 'redux'

import * as homeReducers from '../components/Editor/reducers'

const reducers = Object.assign(
    {},
    homeReducers,
)

export default combineReducers(reducers)
