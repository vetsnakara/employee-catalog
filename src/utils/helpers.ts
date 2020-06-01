// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTruthy = (val: any) => Boolean(val)

export const randIndex = (from: number, to: number) =>
  from + Math.round(Math.random() * (to - from))

export const byField = <T>(field: keyof T) => (a: T, b: T) => {
  if (a[field] < b[field]) return -1
  if (a[field] > b[field]) return 1
  return 0
}
