import { SET_ACTIVE, ActiveAction } from './types'

export const setActive = (id: string): ActiveAction => ({
  type: SET_ACTIVE,
  payload: { id }
})
