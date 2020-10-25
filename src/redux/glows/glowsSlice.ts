import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "../normalize";
import glowData from "./glow_data.json";

type RGBValues = {
  r: number;
  g: number;
  b: number;
};

function floatStrToU8(value: string): number {
  return Math.floor(parseFloat(value) * 255);
}

const slice = createSlice({
  name: "glows",
  initialState: {
    cvars: normalize(
      glowData.map((cvar) => ({
        ...cvar,
        r: floatStrToU8(cvar.r),
        g: floatStrToU8(cvar.g),
        b: floatStrToU8(cvar.b),
        isColorblind: cvar.name.endsWith("colorblind"),
      })),
      (glow) => glow.name
    ),
    flags: {
      cloneToColorblind: true,
    },
  },
  reducers: {
    setGlowColor: (
      state,
      action: PayloadAction<{ name: string; value: RGBValues }>
    ) => {
      const cvar = state.cvars.byId[action.payload.name];
      const { r, g, b } = action.payload.value;
      if (cvar) {
        cvar.r = r;
        cvar.g = g;
        cvar.b = b;
        const colorblindCvar = state.cvars.byId[`${cvar.name}_colorblind`];
        if (state.flags.cloneToColorblind && colorblindCvar) {
          // Also clone this change to the colorblind version of the cvar
          colorblindCvar.r = r;
          colorblindCvar.g = g;
          colorblindCvar.b = b;
        }
      }
    },
    setCloneToColorblind: (state, action: PayloadAction<boolean>) => {
      state.flags.cloneToColorblind = action.payload;
    },
  },
});

export const { setGlowColor, setCloneToColorblind } = slice.actions;

export default slice.reducer;
