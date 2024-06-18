import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { MyStore, MyStoreCustomKey } from "../__test__/types";
import { PersistentSlice } from "../persistentSlice/PersistentSlice";
import { mergeSlices } from "./stateManagerUtils";

describe('mergeSlices', () => {
  describe('with classes initialStates only', () => {
    const slices: PersistentSlice[] = [
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
    it('paths', () => {
      const { paths } = mergeSlices(slices);
      expect(paths).toEqual([
        "myStore",
        "MY_STORE_KEY.id",
      ]);
    });

    it('initial state', () => {
      const { initialState } = mergeSlices(slices);
      expect(initialState).toStrictEqual({
        myStore: slices[0].initialState,
        MY_STORE_KEY: slices[1].initialState,
      });
    });

    it('mappings', () => {
      const { mappings } = mergeSlices(slices);
      expect(mappings).toStrictEqual({
        myStore: MyStore,
        MY_STORE_KEY: MyStoreCustomKey
      });
    });

  });

  describe('with plain initialState', () => {
    const slices2: PersistentSlice[] = [
      {
        initialState: new MyStore(),
        persist: {
          key: 'myStore',
          cls: MyStore,
          paths: ['myStore']
        }
      },
      {
        initialState: { id: undefined },
        persist: {
          key: 'MY_STORE_KEY',
          paths: ['MY_STORE_KEY.id']
        }
      },
    ];

    it('paths', () => {
      const { paths } = mergeSlices(slices2);
      expect(paths).toEqual([
        "myStore",
        "MY_STORE_KEY.id",
      ]);
    });

    it('initial state', () => {
      const { initialState } = mergeSlices(slices2);
      expect(initialState).toStrictEqual({
        myStore: slices2[0].initialState,
        MY_STORE_KEY: slices2[1].initialState,
      });
    });

    it('mappings', () => {
      const { mappings } = mergeSlices(slices2);
      expect(mappings).toStrictEqual({
        myStore: MyStore,
      });
    });
  });
});
