import { combineReducers, configureStore } from "@reduxjs/toolkit";
import configReducer from "./configReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// ...

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["config"],
  debug: true,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    config: configReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
