import { combineReducers } from "@reduxjs/toolkit";

import GlowsReducer from "./glows/glowsSlice";

const rootReducer = combineReducers({
  glows: GlowsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
