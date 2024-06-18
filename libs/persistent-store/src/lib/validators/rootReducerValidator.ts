import { PersistentStoreError } from "../utils/errors";

/**
 * Every initialState should have corresponding reducer
 * @param initialStates
 * @param rootReducer
 */
export const validateRootReducer = (initialStates: Record<string, unknown>, rootReducer: Record<string, object>) => {
  const stateNames = Object.keys(initialStates);
  const reducerNames = Object.keys(rootReducer);

  if (stateNames.length === reducerNames.length) return; // all good!

  const { table, missingStates, missingReducers } = printTable(stateNames, reducerNames);
  let msgStr = 'Missing ';
  // more states than reducers - missing reducer
  if (stateNames.length > reducerNames.length) {
    msgStr += `reducer${missingReducers.length > 1 ? 's' : ''}: [ ${missingReducers.join(',')} ]`;
  }
  // more reducers than states - missing state
  if (reducerNames.length > stateNames.length) {
    msgStr += `state${missingStates.length > 1 ? 's' : ''}: [ ${missingStates.join(',')} ]`;
  }

  console.log(msgStr);
  console.log(table)
  throw new PersistentStoreError(msgStr);
}

const printTable = (stateNames: string[], reducerNames: string[]) => {
  const allNames = Array.from(new Set([...stateNames, ...reducerNames]));
  const wordMaxLen = allNames.reduce((maxLen, currentStr) => Math.max(maxLen, currentStr.length), 0);

  const tableHeader = `|  ${'states'.padEnd(wordMaxLen)}  |  ${'reducers'.padEnd(wordMaxLen)}  |`;

  let rowDivider = '';
  for (let i = 0; i < 11 + 2 * wordMaxLen; i++) {
    if (i % (wordMaxLen + 5) === 0) {
      rowDivider += '|';
      continue;
    }
    rowDivider += '-';
  }

  const missingStates: string[] = [];
  const missingReducers: string[] = [];
  const rows = allNames.map(name => {
    const stateName = stateNames.find(stateName => stateName === name) || '';
    if (!stateName) {
      missingStates.push(name);
    }
    const reducerName = reducerNames.find(reducerName => reducerName === name) || '';
    if (!reducerName) {
      missingReducers.push(name);
    }
    return `|  ${stateName.padEnd(wordMaxLen)}  |  ${reducerName.padEnd(wordMaxLen)}  |`;
  });

  const table = tableHeader + '\n'
    + rowDivider + '\n'
    + rows.join('\n');

  return {
    table,
    missingStates,
    missingReducers
  }
}
