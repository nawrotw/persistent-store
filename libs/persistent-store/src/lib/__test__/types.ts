import { Persist } from "../annotations/Persist";
import { PersistentState } from "../annotations/PersistentState";
import { ExcludePersist } from "../annotations/ExcludePersist";

@PersistentState()
export class MyStore {
  count: number = -1;
}

@PersistentState({ stateName: "MY_STORE_KEY", persistAll: false })
export class MyStoreCustomKey {
  @Persist()
  id: string = "id-1";
  count: number = -1;
}

@PersistentState({ persistAll: false })
export class MyStorePersistIncludeField {
  @Persist()
  id: string = "id-1";
  count: number = -1;
}

@PersistentState()
export class MyStorePersistExcludeField {
  id: string = "id-1";
  @ExcludePersist
  count: number = -1;
}

@PersistentState(/*{ persistAll: true }*/)
export class MyStoreForbiddenPersistConfiguration {
  @Persist()
  id: string = "id-1";
  count: number = -1;
}

@PersistentState({ persistAll: false })
export class MyStoreForbiddenConfiguration {
  id: string = "id-1";
  @ExcludePersist
  count: number = -1;
}
