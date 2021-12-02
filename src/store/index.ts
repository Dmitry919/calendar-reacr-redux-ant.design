import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import reducer from './reducers'

const rootReducer = combineReducers(reducer)

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch