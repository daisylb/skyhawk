import * as actions from "./actions"
import { OrderedMap, Map, fromJS, Record, Seq, Iterable } from "immutable"

const SkyhawkStateItem = Record({
  inFlight: false,
  hasError: false,
  error: null,
  retry: null,
  cancel: null,
})

export class SkyhawkState extends Record({
  list: OrderedMap(),
  idsByKey: Map(),
}) {
  list: OrderedMap<string, any>
  idsByKey: Map<string, string>
  add(id: string, data) {
    return (this.setIn(["list", id], data) as any) as SkyhawkState
  }
  patch(id: string, changedData) {
    return (this.updateIn(["list", id], x =>
      x.with(changedData),
    ) as any) as SkyhawkState
  }
  drop(id: string) {
    return (this.deleteIn(["list", id]) as any) as SkyhawkState
  }
  getInFlight() {
    return this.list.valueSeq().filter(v => v.inFlight)
  }
  getErrors() {
    return this.list.valueSeq().filter(v => v.hasError)
  }
  isInFlight(key: string) {
    return this.list.getIn([this.idsByKey.get(key), "inFlight"]) as boolean
  }
  hasError(key: string) {
    return this.list.getIn([this.idsByKey.get(key), "hasError"]) as boolean
  }
}

/**
 * Reducer handling actions dispatched by Loader.
 *
 * This can be combined into your state with combineReducers.
 */
export default function reducer(
  state: SkyhawkState = new SkyhawkState(),
  action: actions.Action,
): SkyhawkState {
  switch (action.type) {
    case actions.IN_FLIGHT:
      return state.add(action.id, SkyhawkStateItem({ inFlight: true }))
    case actions.COMPLETE:
    case actions.CANCEL:
      return state.drop(action.id)
    case actions.ERROR:
      return state.patch(action.id, {
        inFlight: false,
        hasError: true,
        error: action.error,
        retry: action.retry,
        cancel: action.cancel,
      })
    default:
      return state
  }
}
