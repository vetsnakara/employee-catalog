import React, { FC } from 'react'
import { Action } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { STATUS } from '../../types'
import { RootState } from 'store/root/reducer'
import { updateData } from '../../store/root/actions'

import {
  removeEmployee,
  saveEmployees,
  addEmployee
} from '../../store/employee/actions'

import { Button } from '../Button'
import { Spinner } from '../Spinner'

import './styles.css'

const Toolbar: FC<Props> = ({
  loading,
  activeId,
  hasEdited,
  remove,
  save,
  add,
  update
}) => (
  <div className="toolbar">
    <div className="toolbar__buttons">
      <Button type="primary" onClick={save} disabled={!hasEdited}>
        Save
      </Button>

      <Button type="dark" onClick={update}>
        Update
      </Button>

      <Button
        type="danger"
        onClick={() => remove(activeId || '')}
        disabled={!activeId}
      >
        Remove
      </Button>

      <Button type="success" onClick={add}>
        Add
      </Button>
    </div>

    {loading && <Spinner />}
  </div>
)

const mapState = ({ system: { loading }, activeId, employees }: RootState) => {
  const employeesToSave = employees.filter(
    ({ meta }) =>
      meta && (meta.status === STATUS.EDITED || meta.isNew) && meta.isValid
  )

  return {
    activeId,
    loading,
    hasEdited: employeesToSave.length > 0
  }
}

const mapDispatch = (dispatch: ThunkDispatch<RootState, null, Action>) => ({
  remove: (id: string) => dispatch(removeEmployee(id)),
  save: () => dispatch(saveEmployees()),
  add: () => dispatch(addEmployee()),
  update: () => dispatch(updateData())
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ConnectedToolbar = connector(Toolbar)

export { ConnectedToolbar as Toolbar }
