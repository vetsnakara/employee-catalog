import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  DISMISS_ERROR,
  SystemAction
} from './types'

export const fetchStart = (): SystemAction => ({
  type: FETCH_START
})

export const fetchSuccess = (): SystemAction => ({
  type: FETCH_SUCCESS
})

export const fetchError = (error: Error): SystemAction => ({
  type: FETCH_ERROR,
  payload: { error }
})

export const dismissError = (): SystemAction => ({
  type: DISMISS_ERROR
})
