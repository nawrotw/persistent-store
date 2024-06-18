import { TypedUseSelectorHook, useSelector } from "react-redux";
import { createPersistentStore } from "@ns/redux-persistent-store";
import { appStore } from "../app/AppStore";

export const store = createPersistentStore({
    storageKey: 'state.demoApp',
    // All state stores definitions need to be imported here (in this file), so they are loaded before store is created
    slices: [
      appStore,
    ],
    // We need a static definition to have proper typings
    // [stateName]: Reducer -> stateName === persistedStateName (preloadedStateName) from @PersistentState(stateName)
    rootReducer: {
        app: appStore.reducer,
    }
});

type RootState = ReturnType<typeof store.getState>;
// Use throughout your app instead of plain `useSelector`, because here we have proper typings :-)
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
