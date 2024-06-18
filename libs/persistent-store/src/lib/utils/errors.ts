type ErrorType = 'StoreConfigurationError'

export const getErrorPrefix = (type: ErrorType) => {
  return `[PersistentStore::${type}] `;
}

export class PersistentStoreError extends Error {

  constructor(message: string) {
    super(getErrorPrefix('StoreConfigurationError') + message);
  }
}
