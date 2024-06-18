import { ClassConstructor } from "class-transformer";

export const getMetadata = <T>(obj: object, annotationKey: string): T => {
  const cls = obj.constructor as ClassConstructor<unknown>;

  const metadata: T = Reflect.getMetadata(annotationKey, cls);
  if (!metadata) {
    throw new Error(`Missing @Annotation(${annotationKey}) on class: ${cls.name}`);
  }

  return {
    cls,
    ...metadata
  };

}

export const getFieldNamesByAnnotation = (obj: object, annotationKey: string): string[] => {
  const StateClass = obj.constructor as ClassConstructor<unknown>;

  return Object.keys(obj)
    .map(key => {
      const shouldPersist = Reflect.getMetadata(annotationKey, StateClass.prototype, key);
      return shouldPersist ? key : undefined;
    })
    .filter(Boolean) as string[];
}
