import { PersistentSlice } from "../persistentSlice/PersistentSlice";
import { PersistentConfig } from "../model/PersistentConfig";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { isPlainObject } from "lodash";

export const mergeSlices = (slices: PersistentSlice[]): PersistentConfig => {

  const allPaths = slices.flatMap(slice => slice.persist.paths);

  const storeInitialState: Record<string, object> = slices.reduce((total, current) => {
    const { key } = current.persist;
    total[key] = current.initialState;
    return total;
  }, {} as Record<string, object>);

  const storageMappings: Record<string, ClassConstructor<unknown>> = slices.reduce((total, current) => {
    const { key, cls } = current.persist;
    if (cls) { // state might be a Instance(Class)Object, or PlainObject
      total[key] = cls;
    } else {
      // if no Constructor initialState has to be a plainObject
      if (!isPlainObject(current.initialState)) {
        console.log(`[PersistentStore:Error] Missing cls for initialState:`, current.initialState);
        throw new Error('[PersistentStore:Error] Missing constructor Class. Should not happen!');
      }
    }
    return total;
  }, {} as Record<string, ClassConstructor<unknown>>)

  return {
    initialState: storeInitialState,
    paths: allPaths,
    mappings: storageMappings
  }
}

export const loadStateFromStorage = (storageKey: string, mappings: Record<string, ClassConstructor<unknown>>) => {
  let persistedState = {};
  const persistedPlainState = JSON.parse(localStorage.getItem(storageKey) || "{}");
  Object.keys(persistedPlainState).forEach(key => {
    const cls = mappings[key];
    if (!cls) {
      console.log(`[LocalStorage:${storageKey}] Missing State class for ${key}, store JSON:`);
      console.log(persistedPlainState);
      throw new Error(`Missing State class for ${key}`);
    }
    const plainState = persistedPlainState[key];
    const state = plainToInstance(cls, plainState);
    persistedState = { ...persistedState, [key]: state };
  })
  return persistedState;
}

export const saveStateToStorage = (storageKey: string, plainState: Record<string, unknown>) => {
  localStorage.setItem(storageKey, JSON.stringify(plainState));
}
