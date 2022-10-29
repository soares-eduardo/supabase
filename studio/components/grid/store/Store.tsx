import { useReducer } from 'react'
import { createContainer } from 'react-tracked'
import {
  BaseReducer,
  CallbackReducer,
  ColumnReducer,
  RowReducer,
  initialState,
  InitialStateType,
} from './reducers'

const combineReducers =
  (...reducers: Function[]) =>
  (state: any = initialState, action: any): any => {
    for (const reducer of reducers) {
      state = reducer(state, action)
    }
    return state
  }

const storeReducers = combineReducers(BaseReducer, CallbackReducer, ColumnReducer, RowReducer)

const useValue = () => useReducer(storeReducers, initialState)

export const {
  Provider: StoreProvider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer<InitialStateType, React.Dispatch<any>, unknown>(useValue)
