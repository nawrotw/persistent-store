import 'reflect-metadata';
import { ClassConstructor } from "class-transformer";
import { Type } from "./TypeAnnotation";

export const METADATA_KEY_PERSIST = 'design:persist';

export const Persist = <T>(cls?: ClassConstructor<T>) => (target: any, key: string) => {
  Reflect.defineMetadata(METADATA_KEY_PERSIST, true, target, key);

  if (cls) {// for primitive types like string|number we don't need class
    // needed for proper handling plainToInstance during reading persisted state from LocalStorage
    Type(cls)(target, key);
  }
};
