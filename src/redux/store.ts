import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { userStateReducer } from "./reducers/user";

// redux Store with all reducers
const reducers = combineReducers({
  userState: userStateReducer,
});
// redux store
export const store = createStore(reducers);

type Store = typeof store;
type AppDispatch = Store["dispatch"];
// function type syntax
export const useAppDispatch: () => AppDispatch = useDispatch;

// generics are weird in .tsx files <T,> works but <T> doesn't
// <T> works in .ts file

export const useAppSelector = <T>(
  cb: (state: ReturnType<GetStateFunction>) => T
) => useSelector(cb);

type GetStateFunction = Store["getState"];
