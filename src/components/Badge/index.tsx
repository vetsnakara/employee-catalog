import React, { FC } from 'react'
import cn from 'classnames'

interface Props {
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
}

export const Badge: FC<Props> = ({ type = 'primary', children }) => {
  const classes = cn('badge', 'badge-pill', `badge-${type}`)
  return <span className={classes}>{children}</span>
}
