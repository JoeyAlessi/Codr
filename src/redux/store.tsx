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
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <T,>(
  cb: (state: ReturnType<(typeof store)["getState"]>) => T
) => useSelector(cb);
