import { createSlice, SliceCaseReducers, CreateSliceOptions, Slice } from "@reduxjs/toolkit";
import { immerable } from "immer"
import { ClassConstructor } from "class-transformer";
import { getPersistentPaths } from "./persistentSliceUtils";
import { PersistStateMetadata, METADATA_KEY_PERSISTENT_STATE } from "../annotations/PersistentState";
import { getMetadata } from "../utils/metadataUtils";
import { isFunction } from "../utils/ObjectUtils";

interface PersistentConfig {
  key: string;
  cls?: ClassConstructor<unknown>;
  paths: string[];
}

export interface PersistentSlice {
  initialState: object;
  persist: PersistentConfig;
}

export const createMetaSlice = <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>
(options: CreateSliceOptions<State, CaseReducers, Name>): Slice<State, CaseReducers, Name> & PersistentSlice => {
  const initialState = options.initialState as object; // check/asset isObject!
  const { stateName } = getMetadata<PersistStateMetadata>(initialState, METADATA_KEY_PERSISTENT_STATE);

  const persistentKey = stateName ?? options.name;


  // https://immerjs.github.io/immer/complex-objects/
  // to allow immer do its job we need to have draftable object (isDraftable(initialState) === true)
  initialState.constructor.prototype[immerable] = true;

  return {
    ...createSlice(options),
    initialState,
    persist: {
      key: persistentKey,
      cls: initialState.constructor as ClassConstructor<State>,
      paths: getPersistentPaths(initialState, persistentKey),
    }
  }
};

// TODO wkn: to be implemented
export const createPlainStore = <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>
(options: CreateSliceOptions<State, CaseReducers, Name>): Slice<State, CaseReducers, Name> & { initialState: State; persist: PersistentConfig } => {

  const initialState = isFunction(options.initialState) ? options.initialState() : options.initialState;

  // https://immerjs.github.io/immer/complex-objects/
  // to allow immer do its job we need to have draftable object (isDraftable(initialState) === true)
  (initialState as object).constructor.prototype[immerable] = true;
  console.log(options.initialState)
  return {
    ...createSlice(options),
    initialState: options.initialState as State,
    persist: {
      key: options.name,
      paths: [],
    }
  }
};
