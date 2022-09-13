import { IAction, IInitialState } from "../interfaces";

/**
 * @param slices - reducers
 * @returns all reducers
 */
export const combineReducers =
  (slices: any) => (state: IInitialState, action: IAction) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        // @ts-ignore
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );
