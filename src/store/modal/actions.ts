import { MODAL_OPEN, MODAL_CLOSE, ModalAction, ModalOptions } from './types'

export const modalOpen = (options: ModalOptions): ModalAction => ({
  type: MODAL_OPEN,
  payload: { ...options }
})

export const modalClose = (): ModalAction => ({
  type: MODAL_CLOSE
})
