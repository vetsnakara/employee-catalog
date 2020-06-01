import { combineReducers } from 'redux'

import { systemReducer } from '../system/reducer'
import { actvieReducer } from '../active/reducer'
import { employeeReducer } from '../employee/reducer'
import { modalReducer } from '../modal/reducer'
import { jobReducer } from '../job/reducer'

export const rootReducer = combineReducers({
  system: systemReducer,
  modal: modalReducer,
  activeId: actvieReducer,
  employees: employeeReducer,
  jobs: jobReducer
})

export type RootState = ReturnType<typeof rootReducer>
