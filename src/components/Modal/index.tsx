import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { KEY_CODE } from '../../config/constants'

import './styles.css'

import { RootState } from 'store/root/reducer'

const Modal: FC<Props> = React.memo(
  ({
    show = false,
    content: { title = 'Modal Title', text = 'Modal Text' } = {},
    onClose,
    onSuccess
  }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [visible, setVisible] = useState(false)

    const closeModal = useCallback(() => setVisible(false), [])

    const handleClose = useCallback(() => {
      closeModal()
      onClose()
    }, [onClose, closeModal])

    const handleSuccess = useCallback(() => {
      closeModal()
      onSuccess()
    }, [onSuccess, closeModal])

    const handler = useCallback(
      ({ target, keyCode }) => {
        if (target === ref.current || keyCode === KEY_CODE.ESQ) {
          handleClose()
        } else if (keyCode === KEY_CODE.ENTER) {
          handleSuccess()
        }
      },
      [handleClose, handleSuccess]
    )

    useEffect(() => {
      setVisible(show)
    }, [show])

    useEffect(() => {
      if (visible) {
        document.addEventListener('click', handler)
        document.addEventListener('keydown', handler)
      }

      return () => {
        document.removeEventListener('click', handler)
        document.removeEventListener('keydown', handler)
      }
    }, [visible, handler])

    if (!visible) return null

    return (
      <div ref={ref} className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{text}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSuccess}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

const mapState = ({
  modal: {
    isOpen,
    content,
    callbacks: { onClose, onSuccess }
  }
}: RootState) => ({
  show: isOpen,
  content,
  onClose,
  onSuccess
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ConnectedModal = connector(Modal)

export { ConnectedModal as Modal }
