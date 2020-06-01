import { createStore, Store } from 'redux'
import { rootReducer } from './root/reducer'

import { middleware } from './enhancers'

export const configureStore = (): Store => {
  return createStore(rootReducer, middleware)
}
