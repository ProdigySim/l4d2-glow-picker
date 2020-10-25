import { createSelector } from "@reduxjs/toolkit";
import { Normalized } from "../normalize";
import { AppState } from "../rootReducer";

const RENDER_GLOW_ORDER = [
  "cl_glow_survivor_health_high",
  "cl_glow_survivor_health_med",
  "cl_glow_survivor_health_low",
  "cl_glow_survivor_health_crit",
  "cl_glow_survivor_health_high_colorblind",
  "cl_glow_survivor_health_med_colorblind",
  "cl_glow_survivor_health_low_colorblind",
  "cl_glow_survivor_health_crit_colorblind",
  "cl_glow_survivor",
  "cl_glow_ability",
  "cl_glow_survivor_hurt",
  "cl_glow_survivor_vomit",
  "cl_glow_item",
  "cl_glow_item_far",
  "cl_glow_thirdstrike_item",
  "cl_glow_infected_vomit",
  "cl_glow_ghost_infected",
  "cl_glow_infected",
  "cl_glow_ability_colorblind",
  "cl_glow_thirdstrike_item_colorblind",
];

const getGlowCvars = createSelector(
  (s: AppState) => s.glows.cvars,
  (s: AppState) => s.glows.flags.cloneToColorblind,
  (cvars, cloneToColorblind) =>
    RENDER_GLOW_ORDER.map((glow) => cvars.byId[glow]!).filter((cvar) => {
      // If cloneToColorblind is set, hide colorblind version cvars.
      return !(cloneToColorblind && cvar.isColorblind);
    })
);

export default getGlowCvars;
