import 'reflect-metadata';
import { Type as TransformerType } from "class-transformer";
import { ClassConstructor } from "class-transformer/types/interfaces";

export const METADATA_KEY_CUSTOM_TYPE = 'design:customType';

export const Type = <T>(cls: ClassConstructor<T>) => (target: any, key: string) => {
  Reflect.defineMetadata(METADATA_KEY_CUSTOM_TYPE, cls, target, key);
  TransformerType(() => cls)(target, key);
}
