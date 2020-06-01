import React, { FC } from 'react'
import { Dispatch, Action } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { AiOutlineInbox as EmptyIcon } from 'react-icons/ai'

import { ListItem } from '../ListItem'
import { Placeholder } from '../Placeholder'

import { STATUS } from '../../types'
import { byField } from '../../utils/helpers'

import { Employee } from '../../store/employee/types'
import { setActive } from '../../store/active/actions'
import { RootState } from 'store/root/reducer'

const List: FC<Props> = ({ activeId, items, setActive }) => {
  if (items.length === 0) {
    return (
      <Placeholder>
        <EmptyIcon size={50} color="#ddd" />
      </Placeholder>
    )
  }

  return (
    <div className="list-group">
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onSelect={() => setActive(item.id)}
        />
      ))}
    </div>
  )
}

const mapState = ({ activeId, employees }: RootState) => {
  const newEmployees: Employee[] = []
  const editedEmployees: Employee[] = []
  const otherEmployess: Employee[] = []

  employees.forEach((emp) => {
    const { status, isNew } = emp.meta

    if (isNew) {
      newEmployees.push(emp)
    } else if (status === STATUS.EDITED) {
      editedEmployees.push(emp)
    } else {
      otherEmployess.push(emp)
    }
  })

  newEmployees.sort(byField('name'))
  editedEmployees.sort(byField('name'))
  otherEmployess.sort(byField('name'))

  return {
    activeId,
    items: [...newEmployees, ...editedEmployees, ...otherEmployess]
  }
}

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  setActive: (id: string) => dispatch(setActive(id))
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ConnectedList = connector(List)

export { ConnectedList as List }
