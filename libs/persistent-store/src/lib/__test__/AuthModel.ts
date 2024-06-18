import { PersistentState } from "../annotations/PersistentState";
import { Persist } from "../annotations/Persist";
import { TestUserModel } from "./TestUserModel";
import { Type } from "../annotations/TypeAnnotation";

export interface AccessPermission {
  type: string;
  level: number;
}

@PersistentState({ stateName: 'auth', persistAll: false })
export class AuthState {
  @Persist()
  @Type(TestUserModel)
  currentUser?: TestUserModel;

  // plain objects
  masterPermission?: AccessPermission;
  allPermissions?: AccessPermission[];


  // Caution: for non primitives to be mapped properly (by class-transformer) @Type(Date|BigNumber) is needed
  @Persist(Date)
  expiration?: Date;
  themeColor = 'Default color'; // do not persist me!
  @Persist(/*Primitive type - no need to define class*/)
  description = 'Default description';

  info?: string;


  static fromJson(json: Partial<AuthState>): AuthState {
    return Object.assign(new AuthState(), json);
  }
}
