import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../features/movieSlice";
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";

const store = configureStore({
    reducer: {
        movie: movieSlice
    }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;