import { describe, it, expect } from "vitest";
import { createMetaSlice } from "./PersistentSlice";
import {
  MyStore,
  MyStoreCustomKey,
  MyStorePersistIncludeField,
  MyStorePersistExcludeField,
  MyStoreForbiddenConfiguration,
  MyStoreForbiddenPersistConfiguration
} from "../__test__/types";
import { AuthState } from "../__test__/AuthModel";

describe('CreatePersistentMetaSlice', () => {
  it('all fields should be defined', () => {
    // to create all fields not explicitly listed in the constructor:
    // tsconfig.json => compilerOptions.useDefineForClassFields: true
    const initialState = new AuthState();
    // check if default/empty constructor will create all fields
    expect(Object.keys(initialState)).toEqual(['currentUser', 'masterPermission', 'allPermissions', 'expiration', 'themeColor', 'description', 'info']);
  });

  it('by default should persist whole state', () => {
    const initialState = new MyStore();
    const myStore = createMetaSlice({
      name: "myStore", // storeName will be visible in e.g. actions
      initialState,
      reducers: {}
    });

    expect(myStore.initialState).toBe(initialState);

    expect(myStore.persist).toEqual({
      key: "myStore",  // default key name same as stateName
      cls: MyStore,
      paths: ["myStore"],
    })
  });

  it('should persist under custom key', () => {
    expect(createMetaSlice({
      name: "myStore",
      initialState: new MyStoreCustomKey(),
      reducers: {}
    }).persist).toEqual({
      key: "MY_STORE_KEY",
      cls: MyStoreCustomKey,
      paths: ["MY_STORE_KEY.id"],
    });
  });

  it('should persist selected fields', () => {
    const myStore = createMetaSlice({
      name: "myStore", // storeName will be visible in e.g. actions
      initialState: new MyStorePersistIncludeField(),
      reducers: {}
    });

    expect(myStore.persist).toEqual({
      key: "myStore",
      cls: MyStorePersistIncludeField,
      paths: ["myStore.id"],
    })
  });

  it('should persist complex state', () => {
    const myStore = createMetaSlice({
      name: "auth",
      initialState: new AuthState(),
      reducers: {}
    });

    expect(myStore.persist).toStrictEqual({
      key: "auth",
      cls: AuthState,
      paths: [
        "auth.currentUser",
        "auth.expiration",
        "auth.description",
      ],
    })
  });

  it('should exclude fields', () => {
    const myStore = createMetaSlice({
      name: "myStore",
      initialState: new MyStorePersistExcludeField(),
      reducers: {}
    });

    expect(myStore.persist).toEqual({
      key: "myStore",
      cls: MyStorePersistExcludeField,
      paths: ["myStore.id"],
    })
  });

  it('should throw an Error for forbidden @Persist configuration', () => {
    expect(() => createMetaSlice({
      name: "myStore", // storeName will be visible in e.g. actions
      initialState: new MyStoreForbiddenPersistConfiguration(),
      reducers: {}
    })).toThrow("[PersistentStore:Error][MetaData configuration] Forbidden @Persist usage with { persistAll: true }.")
  });

  it('should throw an Error for forbidden @ExcludePersist configuration', () => {
    expect(() => createMetaSlice({
      name: "myStore", // storeName will be visible in e.g. actions
      initialState: new MyStoreForbiddenConfiguration(),
      reducers: {}
    })).toThrow("[PersistentStore:Error][MetaData configuration] Forbidden @ExcludePersist usage with { persistAll: false }.")
  });

});
