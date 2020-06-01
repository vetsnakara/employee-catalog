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
  size?: 'sm' | 'lg'
  disabled?: boolean
  onClick: () => void
}

export const Button: FC<Props> = ({
  children,
  type = 'primary',
  size = 'sm',
  disabled = false,
  ...rest
}) => (
  <button
    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    className={cn(
      'btn',
      { [`btn-${size}`]: size },
      { [`btn-outline-${type}`]: type }
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
)
