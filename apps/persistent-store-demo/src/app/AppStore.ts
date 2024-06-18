import { PayloadAction } from "@reduxjs/toolkit";
import { PersistentState, Persist, createMetaSlice } from "@ns/redux-persistent-store";

export class UserModel {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

@PersistentState({ persistAll: false })
export class AppState {
  @Persist() // only lvl1 fields can be configured
  count: number = 0;
  count2: number = 0;

  @Persist()
  user: UserModel = new UserModel('John', 'Class');
  plainUser = { firstName: 'John', lastName: 'Plain' };

  public printCount() {
    console.log('[AppState] count:', this.count)
  }
}

export const appStore = createMetaSlice({
  name: "app",
  initialState: new AppState(),
  reducers: {
    updateCount(draft, action: PayloadAction<number>) {
      draft.count = action.payload;
    },
    updateCount2(draft, action: PayloadAction<number>) {
      draft.count2 = action.payload;
    }
  }
});
