import { RootAction } from '../root/types'

export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'

export interface ModalOptions {
  callbacks: {
    onClose: () => void
    onSuccess: () => void
  }
  content?: { title: string; text: string }
}

export interface ModalState extends ModalOptions {
  isOpen: boolean
}

interface ModalOpenAction {
  type: typeof MODAL_OPEN
  payload: ModalOptions
}

interface ModalCloseAction {
  type: typeof MODAL_CLOSE
}

export type ModalAction = ModalOpenAction | ModalCloseAction | RootAction
