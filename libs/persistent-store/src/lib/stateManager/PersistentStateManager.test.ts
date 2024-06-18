import 'reflect-metadata';
import { describe, expect, it, vi, Mock } from 'vitest';
import { AuthState } from "../__test__/AuthModel";
import { TestUserModel } from "../__test__/TestUserModel";
import { MyStore, MyStoreCustomKey } from "../__test__/types";
import { PersistentSlice } from "../persistentSlice/PersistentSlice";
import { createPersistentStateManager } from "./PersistentStateManager";
import { saveStateToStorage } from "./stateManagerUtils";

vi.mock('./stateManagerUtils.ts', async () => ({
    ...await vi.importActual("./stateManagerUtils.ts"),
    saveStateToStorage: vi.fn()
  }
));

const slices: PersistentSlice[] = [
  {
    initialState: new AuthState(),
    persist: {
      key: 'auth',
      cls: AuthState,
      paths: [
        'auth.currentUser',
        'auth.masterPermission',
        'auth.allPermissions',
        'auth.expiration',
        'auth.description',
        'auth.info',
      ]
    }
  },
  {
    initialState: new MyStore(),
    persist: {
      key: 'myStore',
      cls: MyStore,
      paths: ['myStore']
    }
  },
  {
    initialState: new MyStoreCustomKey(),
    persist: {
      key: 'MY_STORE_KEY',
      cls: MyStoreCustomKey,
      paths: ['MY_STORE_KEY.id']
    }
  },
];

const state = {
  auth: new AuthState(),
  myStore: new MyStore(),
  MY_STORE_KEY: new MyStoreCustomKey(),
};

describe('PersistentStateManager', () => {

  it('load - no storage state', () => {
    const manager = createPersistentStateManager(slices);
    expect(manager.load()).toStrictEqual(state);
  });

  it('load - merge initialState and storage state', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify({
        auth: {
          currentUser: { login: 'skywalker.luke', name: 'LukeSkywalker' },
          masterPermission: { type: 'Root', level: 12 },
          allPermissions: [{ type: 'DirA', level: 1 }, { type: 'DirB', level: 2 }],
          expiration: '2022-02-22T22:22:22.222Z',
          description: 'Description loaded from Storage',
          info: 'Info loaded from Storage',
        },
      })
    );

    const manager = createPersistentStateManager(slices);

    const loadedState = manager.load();
    expect(loadedState).toStrictEqual({
      auth: AuthState.fromJson({
        currentUser: new TestUserModel('skywalker.luke', 'LukeSkywalker'),
        masterPermission: { type: 'Root', level: 12 },
        allPermissions: [{ type: 'DirA', level: 1 }, { type: 'DirB', level: 2 }],
        expiration: new Date('2022-02-22T22:22:22.222Z'),
        description: 'Description loaded from Storage',
        info: 'Info loaded from Storage',
        themeColor: 'Default color',
      }),
      myStore: new MyStore(),
      MY_STORE_KEY: new MyStoreCustomKey(),
    });
  });

  it('save', () => {
    const manager = createPersistentStateManager(slices);

    const updatedState = {
      ...state,
      auth: {
        ...state.auth,
        ...AuthState.fromJson({
          currentUser: new TestUserModel('updated.login', 'updated.name'),
          masterPermission: { type: 'Root', level: 12 },
          allPermissions: [{ type: 'DirA', level: 1 }, { type: 'DirB', level: 2 }],
          expiration: new Date('2024-06-02T14:42:01.123Z'),
          description: 'Updated description',
        }),
      }
    }
    manager.save(updatedState);

    expect((saveStateToStorage as Mock).mock.lastCall).toStrictEqual([
      'state', // store key
      {
        auth: {
          currentUser: { login: 'updated.login', name: 'updated.name' },
          masterPermission: { type: 'Root', level: 12 },
          allPermissions: [{ type: 'DirA', level: 1 }, { type: 'DirB', level: 2 }],
          expiration: new Date('2024-06-02T14:42:01.123Z'),
          description: 'Updated description',
          info: undefined,
          // themeColor: 'Default color', - not persisted field
        },
        myStore: { count: -1 },
        MY_STORE_KEY: { id: "id-1" },
      }
    ]);
  });
});
