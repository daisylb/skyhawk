import * as actions from "./actions"
import { OrderedMap, fromJS } from "immutable"

/**
 * Reducer handling actions dispatched by Loader.
 *
 * This can be combined into your state with combineReducers.
 */
export default function reducer(state = OrderedMap(), action) {
  switch (action.type) {
    case actions.IN_FLIGHT:
      return state.set(
        action.key,
        fromJS({
          inFlight: true,
          hasError: false,
          error: null,
          retry: null,
          cancel: null,
        }),
      )
    case actions.COMPLETE:
    case actions.CANCEL:
      return state.delete(action.key)
    case actions.ERROR:
      return state.set(
        action.key,
        fromJS({
          inFlight: false,
          hasError: true,
          error: action.error,
          retry: action.retry,
          cancel: action.cancel,
        }),
      )
    default:
      return state
  }
}
