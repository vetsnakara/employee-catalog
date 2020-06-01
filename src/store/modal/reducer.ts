/* eslint-disable @typescript-eslint/no-empty-function */
import { MODAL_OPEN, MODAL_CLOSE, ModalState, ModalAction } from './types'

const initState: ModalState = {
  isOpen: false,
  callbacks: {
    onClose: () => {},
    onSuccess: () => {}
  }
}

export const modalReducer = (
  state: ModalState = initState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        isOpen: true,
        ...action.payload
      }
    case MODAL_CLOSE:
      return initState
    default:
      return state
  }
}
