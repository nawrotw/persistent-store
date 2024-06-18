import 'reflect-metadata';

export const METADATA_KEY_EXCLUDE_PERSIST = 'design:excludePersist';

export const ExcludePersist = (target: any, key: string) => {
  Reflect.defineMetadata(METADATA_KEY_EXCLUDE_PERSIST, true, target, key);
};
