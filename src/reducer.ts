import * as actions from "./actions"
import { OrderedMap, Map, fromJS, Record } from "immutable"

export const SkyhawkStateItem = Record({
  inFlight: false,
  hasError: false,
  error: null,
  retry: null,
  cancel: null,
})
export type SkyhawkState = OrderedMap<
  string,
  Map<string, typeof SkyhawkStateItem>
>

/**
 * Reducer handling actions dispatched by Loader.
 *
 * This can be combined into your state with combineReducers.
 */
export default function reducer(
  state: SkyhawkState = OrderedMap(),
  action: actions.Action,
) {
  switch (action.type) {
    case actions.IN_FLIGHT:
      state.get("a").get("foo")
      return state.set(
        action.key,
        SkyhawkStateItem({
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
        SkyhawkStateItem({
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
