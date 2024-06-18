import { METADATA_KEY_EXCLUDE_PERSIST } from "../annotations/ExcludePersist";
import { METADATA_KEY_PERSIST } from "../annotations/Persist";
import { PersistStateMetadata, METADATA_KEY_PERSISTENT_STATE } from "../annotations/PersistentState";
import { getFieldNamesByAnnotation, getMetadata } from "../utils/metadataUtils";

export const getPersistentPaths = (initialState: object, persistentKey: string): string[] => {

  const excludedFields = getFieldNamesByAnnotation(initialState, METADATA_KEY_EXCLUDE_PERSIST);
  const persistedFields = getFieldNamesByAnnotation(initialState, METADATA_KEY_PERSIST);
  const { persistAll } = getMetadata<PersistStateMetadata>(initialState, METADATA_KEY_PERSISTENT_STATE);

  if (persistAll) {
    if (persistedFields.length > 0) {
      throw new Error('[PersistentStore:Error][MetaData configuration] Forbidden @Persist usage with { persistAll: true }.');
    }

    if (excludedFields.length > 0) {
      return Object.keys(initialState) // allFields
        .filter(key => !excludedFields.some(excludedField => excludedField === key))
        .map(fieldName => `${persistentKey}.${fieldName}`)
    }
    return [persistentKey];
  }

  if (excludedFields.length > 0) {
    throw new Error('[PersistentStore:Error][MetaData configuration] Forbidden @ExcludePersist usage with { persistAll: false }.');
  }

  return persistedFields.map(fieldName => `${persistentKey}.${fieldName}`);
}
