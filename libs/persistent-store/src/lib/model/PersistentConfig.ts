import { ClassConstructor } from "class-transformer";

export interface PersistentConfig {
  paths: Array<string>;
  initialState: Record<string, unknown>;
  mappings: Record<string, ClassConstructor<unknown>>;
}
