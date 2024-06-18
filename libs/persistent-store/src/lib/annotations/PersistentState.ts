import { ClassConstructor } from "class-transformer";

export const METADATA_KEY_PERSISTENT_STATE = 'design:persistState';

export interface PersistStateMetadata {
  stateName?: string;
  persistAll?: boolean;
}

export const PersistentState = (props?: PersistStateMetadata) => (target: ClassConstructor<unknown>) => {
  props = props ? { persistAll: true, ...props } : { persistAll: true }
  return Reflect.defineMetadata(METADATA_KEY_PERSISTENT_STATE, props ?? { persistAll: true }, target);
};
