import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { AuthState } from "../__test__/AuthModel";
import { MyStore, MyStoreCustomKey } from "../__test__/types";
import { PersistentStoreError } from "../utils/errors";
import { validateRootReducer } from "./rootReducerValidator";

const initialStates = {
  auth: new AuthState(),
  myStore: new MyStore(),
  MY_STORE_KEY: new MyStoreCustomKey(),
};

describe('rootReducer key validation', () => {
  it('all good', () => {
    const rootReducer = {
      auth: {},
      myStore: {},
      MY_STORE_KEY: {},
    };

    expect(() => validateRootReducer(initialStates, rootReducer)).not.toThrow();
  });

  it('missing state', () => {
    const rootReducer = {
      auth: {},
      myStore: {},
      MY_STORE_KEY: {},
      auth2: {},
    };

    expect(() => validateRootReducer(initialStates, rootReducer))
      .toThrow(new PersistentStoreError("Missing state: [ auth2 ]"));
  });

  it('missing reducers', () => {
    const rootReducer = {
      auth: {},
      MY_STORE_KEY: {},
    };

    expect(() => validateRootReducer(initialStates, rootReducer))
      .toThrow(new PersistentStoreError("Missing reducer: [ myStore ]"));
  });
});
