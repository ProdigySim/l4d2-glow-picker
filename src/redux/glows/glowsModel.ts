import { AppState } from "../rootReducer";

export type GlowCvar = Exclude<
  AppState["glows"]["cvars"]["byId"][0],
  undefined
>;
