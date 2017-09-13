export const IN_FLIGHT = "cmv.loader.IN_FLIGHT"
export const COMPLETE = "cmv.loader.COMPLETE"
export const ERROR = "cmv.loader.ERROR"
export const CANCEL = "cmv.loader.CANCEL"

export type InFlight = {
  type: typeof IN_FLIGHT
  id: string
  action: string
  keys: any[]
}
export type Complete = {
  type: typeof COMPLETE
  id: string
}
export type ErrorAction = {
  type: typeof ERROR
  id: string
  error: any
  retry: () => void
  cancel: () => void
}
export type Cancel = {
  type: typeof CANCEL
  id: string
}
export type Action = InFlight | Complete | ErrorAction | Cancel
