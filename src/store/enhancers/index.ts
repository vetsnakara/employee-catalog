import { applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'

export const middleware = applyMiddleware<ThunkMiddleware>(thunk)
