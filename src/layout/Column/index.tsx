import React, { FC } from 'react'

interface Props {
  size?:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
}

export const Column: FC<Props> = ({ children, size }) => {
  const classes = size ? `col-${size}` : 'col'
  return <div className={classes}>{children}</div>
}
