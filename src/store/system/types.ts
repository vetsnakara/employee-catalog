import { RootAction } from '../root/types'

export const FETCH_START = 'FETCH_START'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
export const DISMISS_ERROR = 'DISMISS_ERROR'

export interface SystemState {
  loading: boolean
  error: Error | null
}

export interface FetchStartAction {
  type: typeof FETCH_START
}

export interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS
}

export interface FetchErrorAction {
  type: typeof FETCH_ERROR
  payload: { error: Error }
}

export interface DismissErrorAction {
  type: typeof DISMISS_ERROR
}

export type SystemAction =
  | FetchStartAction
  | FetchSuccessAction
  | FetchErrorAction
  | DismissErrorAction
  | RootAction
