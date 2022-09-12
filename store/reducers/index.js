import { combineReducers } from 'redux'
import org_entitiesReducers from './org_entities.reducers'

const appReducer = combineReducers({
  org_entities: org_entitiesReducers,
})
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
