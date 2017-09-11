export const IN_FLIGHT = "cmv.loader.IN_FLIGHT"
export const COMPLETE = "cmv.loader.COMPLETE"
export const ERROR = "cmv.loader.ERROR"
export const CANCEL = "cmv.loader.CANCEL"

export type InFlight = {
  type: typeof IN_FLIGHT,
  key: string,
}
export type Complete = {
  type: typeof COMPLETE,
  key: string,
}
export type ErrorAction = {
  type: typeof ERROR,
  key: string,
  error: any,
  retry: () => void,
  cancel: () => void,
}
export type Cancel = {
  type: typeof CANCEL,
  key: string,
}
export type Action = InFlight | Complete | ErrorAction | Cancel