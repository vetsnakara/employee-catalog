import React, { FC } from 'react'
import { Dispatch, Action } from 'redux'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../../store/root/reducer'
import { dismissError } from '../../store/system/actions'

const Error: FC<Props> = ({ error, onClose }) => {
  if (!error) return null

  return (
    <div className="text-center alert alert-danger alert-dismissible">
      {error.message}
      <button type="button" className="close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

const mapState = (state: RootState) => ({
  error: state?.system.error
})

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  onClose: () => dispatch(dismissError())
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ConnectedError = connector(Error)

export { ConnectedError as Error }
