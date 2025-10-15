// import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook } from "react-redux";
// import rootReducer from "./root-reducer";
// import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== "production",
// });

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

// export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// export const useDispatch = () => useReduxDispatch<AppDispatch>();

// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import rootReducer from "./root-reducer"; // your combined reducers

// // Redux Persist configuration
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["app"], // add slice names here to persist
// };

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // needed to ignore non-serializable Redux-Persist actions
//     }),
//   devTools: process.env.NODE_ENV !== "production",
// });

// // Create persistor
// export const persistor = persistStore(store);

// // Type definitions
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

// // Hooks
// export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// export const useDispatch = () => useReduxDispatch<AppDispatch>();

// export default store;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./root-reducer";
import { encryptTransform } from "redux-persist-transform-encrypt";

// 🔐 Create the encryptor
const encryptor = encryptTransform({
  secretKey: process.env.REACT_APP_REDUX_SECRET_KEY! || "stoxkart@redux@123",
  onError: function (error) {
    console.error("Encryption error:", error);
  },
});

// 🛠 Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app"], // Replace with the slice(s) you want to persist
  transforms: [encryptor], // 🔒 Apply encryption transform
};

// 📦 Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏪 Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// ♻️ Create persistor
export const persistor = persistStore(store);

// 🧠 Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

// 🔄 Hooks
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
