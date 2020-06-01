import React, { FC } from 'react'
import cn from 'classnames'

import { STATUS } from '../../types'
import { Employee } from '../../store/employee/types'

import { Badge } from '../Badge'

import './styles.css'

interface Props {
  item: Employee
  isActive: boolean
  onSelect: () => void
}

export const ListItem: FC<Props> = ({
  item: {
    name,
    meta: { isValid, isNew, status }
  },
  isActive,
  onSelect
}) => {
  const classes = cn(
    'list__item',
    'list-group-item',
    'list-group-item-action',
    { 'list__item--invalid': !isValid },
    { active: isActive }
  )

  return (
    <div className={classes} onClick={onSelect}>
      <span>{name}</span>
      {isNew ? (
        <Badge type="success">new</Badge>
      ) : status === STATUS.EDITED ? (
        <Badge type="warning">edit</Badge>
      ) : null}
    </div>
  )
}
