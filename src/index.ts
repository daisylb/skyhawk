import * as actions from "./actions"

/**
 * Redux-thunk helper for network tasks.
 *
 * This function takes an extended thunk, which can either take the parameters
 * `(dispatch, getState, ok, cancel)`, where `ok` and `cancel` are callables
 * to indicate success or failure respectively, or a regular thunk that returns
 * a promise.
 *
 * Given this, it will dispatch actions when the process starts, succeeds and/or
 * fails. In conjunction with the reducer, this lets you show in-flight and
 * error UIs in a generic way.
 *
 * @param {*string} key Key to identify the action being performed.
 * @param {*function} innerFunc Function to execute to actually perform the
 *  action.
 */
export default function load(key, innerFunc) {
  return function(dispatch, getState) {
    const cancel = () => ({
      type: actions.CANCEL,
      key,
    })
    const ok = () =>
      dispatch({
        type: actions.COMPLETE,
        key,
      })
    const fail = error => {
      console.warn("loader recieved an error", error)
      dispatch({
        type: actions.ERROR,
        key,
        error,
        retry,
        cancel,
      })
    }
    const retry = () => {
      return (dispatch, getState) => {
        dispatch({ type: actions.IN_FLIGHT, key })
        const irv = innerFunc(dispatch, getState, ok, fail)
        if (typeof irv.then === "function") {
          irv.then(ok, fail)
        }
      }
    }
    dispatch(retry())
  }
}
