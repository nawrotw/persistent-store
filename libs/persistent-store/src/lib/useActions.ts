import { useDispatch } from "react-redux";

export const useActions = <T extends Record<string, (...args: any[]) => any>>(actions: T): T => {
  const dispatch = useDispatch();

  const wrappedActions: Record<string, any> = {};

  Object.keys(actions)
    .forEach((key) => {
      const originalActionCreator = actions[key];
      wrappedActions[key] = function actionCreator(...args: any[]) {
        return dispatch(originalActionCreator(...args));
      };
    });
  return wrappedActions as T;
};
