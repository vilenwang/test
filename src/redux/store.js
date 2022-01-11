import { combineReducers, createStore } from 'redux'
import { CollapsedReduser } from './reducers/CollapsedReducer'

// 合并reducer
const reducer = combineReducers({
  CollapsedReduser,
})
const store = createStore(reducer)

export default store
