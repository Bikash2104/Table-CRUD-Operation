// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
// import type { RootState, AppDispatch } from "./store";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// import type { RootState, AppDispatch } from "./store";

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux"; // 👈 type-only import
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
