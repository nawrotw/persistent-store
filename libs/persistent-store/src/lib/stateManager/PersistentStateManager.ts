import { instanceToPlain } from "class-transformer";
import { pick } from "lodash";
import { PersistentSlice } from "../persistentSlice/PersistentSlice";
import { mergeSlices, loadStateFromStorage, saveStateToStorage } from "./stateManagerUtils";

export const createPersistentStateManager = (slices: PersistentSlice[], storageKey = 'state') => {

  const { initialState, paths, mappings } = mergeSlices(slices);

  const load = () => {
    const persistedState = loadStateFromStorage(storageKey, mappings);
    return { ...initialState, ...persistedState };
  }

  const save = <S = object>(state: S) => {
    const toBeSerialized = pick<any, string>(state, paths);
    const plainState = instanceToPlain(toBeSerialized);
    saveStateToStorage(storageKey, plainState);
  }

  return {
    initialState,
    load,
    save,
  }
}
