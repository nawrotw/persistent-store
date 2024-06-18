import { Action, StoreEnhancer, Middleware, Reducer, ReducersMapObject, type UnknownAction } from "redux";
import { EnhancedStore, configureStore, Tuple } from "@reduxjs/toolkit";
import { ExtractDispatchExtensions } from "@reduxjs/toolkit/dist/tsHelpers";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { createPersistentStateManager } from "./stateManager/PersistentStateManager";
import { PersistentSlice } from "./persistentSlice/PersistentSlice";
import { validateRootReducer } from "./validators/rootReducerValidator";
import { debounce } from "./utils/ObjectUtils";

declare type Enhancers = ReadonlyArray<StoreEnhancer>;
declare type Middlewares<S> = ReadonlyArray<Middleware<object, S>>;

export interface ConfigurePersistentStoreOptions<S = any, A extends Action = UnknownAction> {
  slices: PersistentSlice[];
  rootReducer: Reducer<S, A> | ReducersMapObject<S, A>;
  storageKey?: string,
}

export const createPersistentStore =
  <S = object, A extends Action = UnknownAction, M extends Tuple<Middlewares<S>> = Tuple<[ThunkMiddlewareFor<S>]>, E extends Tuple<Enhancers> = Tuple<[
    StoreEnhancer<{ dispatch: ExtractDispatchExtensions<M> }>,
    StoreEnhancer
  ]>>(options: ConfigurePersistentStoreOptions<S, A>): EnhancedStore<S, A, E> => {

    const { rootReducer, storageKey, slices } = options;
    const stateManager = createPersistentStateManager(slices, storageKey);

    validateRootReducer(stateManager.initialState, rootReducer as Record<string, object>);

    const store = configureStore({
      preloadedState: stateManager.load() as S,
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // We have our own serialization mechanics
      }),
    });

    let prevState: S;
    const debouncedSave = debounce(() => {
      const state = store.getState();
      // potentially some part of the state might have been changed
      if (prevState && JSON.stringify(prevState) === JSON.stringify(state)) {
        return;
      }
      prevState = state;
      stateManager.save(state);
    }, 200);

    // State Change listener.
    // It will be called any time an action is dispatched, and potentially some part of the state might have been changed.
    store.subscribe(debouncedSave);

    return store as EnhancedStore<S, A, E>;
  }
